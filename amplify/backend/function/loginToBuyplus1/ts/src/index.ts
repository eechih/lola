import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import chromium from '@sparticuz/chromium'
import { AmplifyGraphQlResolverEvent } from 'aws-lambda'
import { SSM } from 'aws-sdk'
import puppeteer, { Browser, Protocol } from 'puppeteer-core'

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_LOLA_BUCKETNAME
Amplify Params - DO NOT EDIT */

const region = process.env.REGION
const bucketName = process.env.STORAGE_LOLA_BUCKETNAME
const s3Client = new S3Client({ region: region })
const ssm = new SSM()

const getSecretValues = async (secretNames: string[]): Promise<string[]> => {
  console.log('getSecretValues...', secretNames)
  const { Parameters } = await ssm
    .getParameters({
      Names: secretNames.map(secretName => process.env[secretName] ?? ''),
      WithDecryption: true,
    })
    .promise()

  const secretValues = secretNames.map(
    secretName =>
      Parameters?.find(parameter => parameter.Name?.endsWith(secretName))
        ?.Value ?? ''
  )
  return secretValues
}

const inAWSCloud: boolean = __dirname === '/var/task'

const createPuppeteerBrowser = async () => {
  console.log('createPuppeteerBrowser...')
  if (inAWSCloud) {
    return await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      // refer to https://github.com/Sparticuz/chromium/issues/24#issuecomment-1334580490
      executablePath: await chromium.executablePath(
        '/opt/nodejs/node_modules/@sparticuz/chromium/bin'
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })
  }

  return await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
    headless: false,
  })
}

const loginToFacebook = async (
  browser: Browser,
  props: { email: string; pass: string }
): Promise<Protocol.Network.Cookie[]> => {
  console.log('loginToFacebook...')
  const { email, pass } = props
  const page = await browser.newPage()
  await page.goto('https://www.facebook.com/login')
  const loginButton = await page.waitForSelector('#loginbutton')
  await page.type('#email', email)
  await page.type('#pass', pass)
  await loginButton?.click()
  await page.waitForNavigation()
  const cookies = await page.cookies()
  console.log('facebook cookies:', cookies)
  return cookies
}

const obtainBuyplus1Cookies = async (
  browser: Browser,
  props: { fbCookies: Protocol.Network.Cookie[] }
): Promise<Protocol.Network.Cookie[]> => {
  console.log('obtainBuyplus1Cookies...')
  const { fbCookies } = props
  const page = await browser.newPage()
  page.setCookie(...fbCookies)
  await page.goto(
    'https://s18.buyplus1.com.tw/b/1301023989915468/admin/index.php'
  )
  const cookies = await page.cookies()
  console.log('buyPlus1 cookies:', cookies)
  return cookies
}

const putObject = async (props: { key: string; body: string }) => {
  const { key, body } = props
  try {
    await s3Client.send(
      new PutObjectCommand({ Bucket: bucketName, Key: key, Body: body })
    )
    console.log('Successfully put object to S3.', key)
  } catch (err) {
    console.log('Error', err)
    throw err
  }
}

const getObject = async (props: { key: string }): Promise<string> => {
  const { key } = props
  try {
    const response = await s3Client.send(
      new GetObjectCommand({ Bucket: bucketName, Key: key })
    )
    const body = (await response.Body?.transformToString()) ?? ''
    console.log(body)
    return body
  } catch (err) {
    console.log('Error', err)
    throw err
  }
}

type Cookie = {
  name: string
  value: string
  path?: string
  domain?: string
  expires?: number
  samSite?: 'Strict' | 'Lax' | 'None'
  secure?: boolean
  [property: string]: any
}

const transformCookie = (cookie: Protocol.Network.Cookie): Cookie => {
  return {
    name: cookie.name,
    value: cookie.value,
    path: cookie.path,
    domain: cookie.domain,
    expires: cookie.expires,
    samSite: cookie.sameSite,
    secure: cookie.secure,
  } as Cookie
}

export const handler = async (event: AmplifyGraphQlResolverEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  try {
    // Retrieve Facebook email and password from AWS SSM.
    const [email, pass] = await getSecretValues(['fbemail', 'fbpass'])

    // Create a browser controlled by Puppeteer.
    const browser = await createPuppeteerBrowser()

    // Login to Facebook and retrieve cookies.
    const fbCookies = await loginToFacebook(browser, { email, pass })

    await putObject({
      key: 'private/cookie/facebook.json',
      body: JSON.stringify(fbCookies.map(transformCookie)),
    })

    // Obtain BuyPlus1 cookies.
    const cookies = await obtainBuyplus1Cookies(browser, { fbCookies })

    await putObject({
      key: 'private/cookie/buyplus1.json',
      body: JSON.stringify(cookies.map(transformCookie)),
    })

    // Close the browser.
    const pages = await browser.pages()
    await Promise.all(
      pages.map(async page => {
        console.log('close page...', page.url())
        await page.close()
      })
    )
    console.log('close browser...')
    await browser.close()
  } catch (err) {
    console.log('Error', err)
  }
  return 'BuyPlus1 login successful'
}
