import chromium from '@sparticuz/chromium'
import axios, { Axios } from 'axios'
import puppeteer, { Protocol } from 'puppeteer-core'
import { v4 as uuidv4 } from 'uuid'

export const getUniqueId = () => uuidv4().replace(/-/g, '').toLowerCase()

export const getUniqueName = (name: string) =>
  `${name.toLowerCase()}-${getUniqueId}`

export const inAWSCloud: boolean = __dirname === '/var/task'

export const convertToAxiosCookie = (
  cookies: Protocol.Network.Cookie[]
): string => {
  return cookies.map(coolie => `${coolie.name}=${coolie.value}`).join('; ')
}

const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'

type CreateAxiosProps = {
  baseUrl?: string
  cookies?: Protocol.Network.Cookie[]
  userAgent?: string // default
  timeout?: number // unit: milliseconds, defult: 5000
  withCredentials?: boolean // default true
}

export const createPuppeteerBrowser = async () => {
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

export const createAxios = (props: CreateAxiosProps): Axios => {
  const {
    baseUrl,
    cookies,
    timeout = 5000,
    withCredentials = true,
    userAgent = USER_AGENT,
  } = props

  const instance = axios.create({
    headers: { 'User-Agent': userAgent },
    timeout: timeout,
    withCredentials: withCredentials,
  })

  if (baseUrl) instance.defaults.baseURL = baseUrl

  if (cookies) {
    const cookie = convertToAxiosCookie(cookies)
    instance.interceptors.request.use(
      config => {
        config.headers.set('Cookie', cookie)
        return config
      },
      error => Promise.reject(error)
    )
  }
  return instance
}
