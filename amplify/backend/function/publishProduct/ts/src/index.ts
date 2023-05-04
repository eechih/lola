/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["facebook_credentials"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	API_LOLA_GRAPHQLAPIENDPOINTOUTPUT
	API_LOLA_GRAPHQLAPIIDOUTPUT
	API_LOLA_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { AmplifyGraphQlResolverEvent } from 'aws-lambda'

import * as API from './API'
import { ADMIN_PAGE_URL, login, publishProduct } from './buyplus1'
import { getSecretValues } from './ssm'
import { createAxios, createPuppeteerBrowser } from './utils'

export const handler = async (event: AmplifyGraphQlResolverEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  let browser
  try {
    const { productId } = event.arguments as { productId: string }

    // Retrieve product data vis GraphQL API.
    const product = await API.getProduct(productId)
    console.log('product', product)

    // Retrieve Facebook email and password from AWS SSM.
    const [fbemail, fbpass] = await getSecretValues(['fbemail', 'fbpass'])

    browser = await createPuppeteerBrowser()

    // Login to Facebook and retrieve BuyPlus1 cookies.
    const { cookies } = await login(browser, { email: fbemail, pass: fbpass })
    console.log('cookies', cookies)

    // Create an Axios instance with BuyPlus1 cookies.
    const axiosInstace = createAxios({ baseUrl: ADMIN_PAGE_URL, cookies })

    // Publish products to BuyPlus1.
    await publishProduct(axiosInstace, product)
    return product
  } catch (error) {
    console.log('Error', error)
    throw error
  } finally {
    if (browser) await browser.close()
  }
}
