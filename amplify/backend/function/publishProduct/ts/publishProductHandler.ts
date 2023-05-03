import { AmplifyGraphQlResolverEvent } from 'aws-lambda'
import axios from 'axios'

const graphqlEndpoint = process.env.API_LOLA_GRAPHQLAPIENDPOINTOUTPUT
const graphqlApiKey = process.env.API_LOLA_GRAPHQLAPIKEYOUTPUT

export default async function handler(event: AmplifyGraphQlResolverEvent) {
  console.log('publishProduct...')
  const { productId } = event.arguments as { productId: string }

  const response = await axios({
    url: graphqlEndpoint,
    method: 'POST',
    headers: {
      'x-api-key': graphqlApiKey,
      'Content-Type': 'application/json',
    },
    data: { query: getProduct, variables: { id: productId + '1' } },
  })

  console.log('response.status', response.status)
  console.log('response.data', response.data)
  const product = response.data?.data?.getProduct

  return product
}

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      price
      cost
      specGroups {
        items {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productSpecGroupsId
          owner
        }
        nextToken
        startedAt
      }
      images {
        items {
          id
          url
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productImagesId
          owner
        }
        nextToken
        startedAt
      }
      provider
      offShelfTime
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`
