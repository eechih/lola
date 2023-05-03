/* Amplify Params - DO NOT EDIT
	API_LOLA_GRAPHQLAPIENDPOINTOUTPUT
	API_LOLA_GRAPHQLAPIIDOUTPUT
	API_LOLA_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { AmplifyGraphQlResolverEvent } from 'aws-lambda'
import axios from 'axios'

import * as queries from './graphql/queries'

const graphqlEndpoint = process.env.API_LOLA_GRAPHQLAPIENDPOINTOUTPUT
const graphqlApiKey = process.env.API_LOLA_GRAPHQLAPIKEYOUTPUT

export const handler = async (event: AmplifyGraphQlResolverEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  const { productId } = event.arguments as { productId: string }

  const response = await axios({
    url: graphqlEndpoint,
    method: 'POST',
    headers: {
      'x-api-key': graphqlApiKey,
      'Content-Type': 'application/json',
    },
    data: { query: queries.getProduct, variables: { id: productId } },
  })

  console.log('response.status', response.status)
  console.log('response.data', response.data)
  const product = response.data?.data?.getProduct

  return product
}
