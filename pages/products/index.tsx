import { GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api'
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub'
import { API, Hub, graphqlOperation } from 'aws-amplify'
import { useEffect, useState } from 'react'
import {
  CreateProductInput,
  CreateProductMutation,
  DeleteProductMutation,
  ListProductsQuery,
  ListProductsQueryVariables,
  OnCreateProductSubscription,
  Product,
} from '../../src/API'
import * as mutations from '../../src/graphql/mutations'
import * as queries from '../../src/graphql/queries'
import * as subscriptions from '../../src/graphql/subscriptions'

const initialState = { name: '', description: '' }

const Index = () => {
  const [formState, setFormState] = useState(initialState)
  const [products, setProducts] = useState<Product[]>([])

  Hub.listen('api', (data: any) => {
    const { payload } = data
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const connectionState = payload.data.connectionState as ConnectionState
      console.log('connectionState', connectionState)
    }
  })

  useEffect(() => {
    fetchProducts()
    const sub = API.graphql<GraphQLSubscription<OnCreateProductSubscription>>(
      graphqlOperation(subscriptions.onCreateProduct)
    ).subscribe(fetchProducts)
    return () => sub.unsubscribe()
  }, [])

  function setInput(key: string, value: string) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchProducts() {
    try {
      const variables: ListProductsQueryVariables = {
        // filter: { name: { beginsWith: 'a' } },
        // limit: 3,
      }
      const res = await API.graphql<GraphQLQuery<ListProductsQuery>>({
        query: queries.listProducts,
        variables: variables,
      })
      console.log(res)
      if (res.data?.listProducts) {
        const { items, nextToken } = res.data.listProducts
        console.log('Products retrieved successfully!', items)
        if (items) setProducts(items as Product[])
      }
    } catch (error) {
      console.log('Error retrieving products', error)
    }
  }

  async function createProduct() {
    try {
      if (!formState.name || !formState.description) return
      const productDeatils: CreateProductInput = { ...formState }
      setProducts([...products, productDeatils as Product])
      setFormState(initialState)
      await API.graphql<GraphQLQuery<CreateProductMutation>>({
        query: mutations.createProduct,
        variables: { input: productDeatils },
      })
    } catch (error) {
      console.log('Error creating products', error)
    }
  }

  async function deleteProduct(productId: string) {
    try {
      setProducts(products.filter(product => product.id !== productId))
      await API.graphql<GraphQLQuery<DeleteProductMutation>>({
        query: mutations.deleteProduct,
        variables: { input: { id: productId } },
      })
    } catch (error) {
      console.log('Error deleting product', error)
    }
  }

  return (
    <div>
      <h2>Products</h2>
      <div>
        Name:{' '}
        <input
          onChange={event => setInput('name', event.target.value)}
          value={formState.name}
          placeholder="Name"
        />
      </div>
      <div>
        Description:{' '}
        <input
          onChange={event => setInput('description', event.target.value)}
          value={formState.description}
          placeholder="Description"
        />
      </div>
      <button onClick={createProduct}>Create product</button>

      <ol>
        {products.map((product, index) => (
          <li key={product.id ?? index}>
            <b>{product.name}</b> - <span>{product.description}</span>
            <button onClick={() => deleteProduct(product.id)}>[delete]</button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Index
