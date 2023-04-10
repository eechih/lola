import { GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'
import { useEffect, useState } from 'react'
import {
  CreateProductMutation,
  ListProductsQuery,
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
      const result = await API.graphql<GraphQLQuery<ListProductsQuery>>({
        query: queries.listProducts,
      })
      const products = result.data?.listProducts?.items as Product[]
      console.log(
        'Products retrieved successfully!',
        JSON.stringify(products, null, 2)
      )
      setProducts(products)
    } catch (error) {
      console.log('Error retrieving products', error)
    }
  }

  async function createProduct() {
    try {
      if (!formState.name || !formState.description) return
      const product = { ...formState } as Product
      setProducts([...products, product])
      setFormState(initialState)
      await API.graphql<GraphQLQuery<CreateProductMutation>>(
        graphqlOperation(mutations.createProduct, { input: product })
      )
    } catch (error) {
      console.log('Error creating products', error)
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

      {products.map((product, index) => (
        <div key={product.id ?? index}>
          <p>{product.name}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Index
