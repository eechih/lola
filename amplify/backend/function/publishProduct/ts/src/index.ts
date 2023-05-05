/* Amplify Params - DO NOT EDIT
	API_LOLA_GRAPHQLAPIENDPOINTOUTPUT
	API_LOLA_GRAPHQLAPIIDOUTPUT
	API_LOLA_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { S3Client } from '@aws-sdk/client-s3'
import { AmplifyGraphQlResolverEvent } from 'aws-lambda'

import * as API from './API'
import { ADMIN_PAGE_URL, obtainToken, publishProduct } from './buyplus1'
import { Product } from './models'
import { Cookie, createAxios, getObject } from './utils'

const region = process.env.REGION
const bucketName = process.env.STORAGE_LOLA_BUCKETNAME ?? ''
const s3Client = new S3Client({ region: region })

export const handler = async (event: AmplifyGraphQlResolverEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  const { productId } = event.arguments as { productId: string }

  // Retrieve product data vis GraphQL API.
  const product: Product = await API.getProduct(productId)
  console.log('product', product)

  // download cookies from S3
  const facebookCookiePayload = await getObject(s3Client, {
    bucket: bucketName,
    key: 'private/cookie/facebook.json',
  })
  const buyplus1CookiePayload = await getObject(s3Client, {
    bucket: bucketName,
    key: 'private/cookie/buyplus1.json',
  })
  const facebookCookies = JSON.parse(facebookCookiePayload) as Cookie[]
  const buyplus1Cookies = JSON.parse(buyplus1CookiePayload) as Cookie[]

  // Create an Axios instance with cookies.
  const axiosInstace = createAxios({
    baseUrl: ADMIN_PAGE_URL,
    cookies: [...facebookCookies, ...buyplus1Cookies],
  })

  // Obtain BuyPlus1 token.
  const token = await obtainToken(axiosInstace)

  if (token) {
    console.log('token', token)
    // Publish products to BuyPlus1.
    await publishProduct(axiosInstace, token, { product })
  } else throw new Error('Failed to get BuyPlus1 token.')

  return product
}
