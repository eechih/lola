import axios from 'axios'

import * as queries from './graphql/queries'
import { Product } from './models'

const graphqlEndpoint = process.env.API_LOLA_GRAPHQLAPIENDPOINTOUTPUT
const graphqlApiKey = process.env.API_LOLA_GRAPHQLAPIKEYOUTPUT

export const getProduct = async (productId: string): Promise<Product> => {
  const response = await axios({
    url: graphqlEndpoint,
    method: 'POST',
    headers: {
      'x-api-key': graphqlApiKey,
      'Content-Type': 'application/json',
    },
    data: { query: queries.getProduct, variables: { id: productId } },
  })
  return response.data?.data?.getProduct as Product
}
