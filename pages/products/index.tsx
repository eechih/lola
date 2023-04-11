import {
  GRAPHQL_AUTH_MODE,
  GraphQLQuery,
  GraphQLResult,
  GraphQLSubscription,
} from '@aws-amplify/api'
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub'
import {
  Button,
  Divider,
  Flex,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Alert as UIAlert,
  View,
  WithAuthenticatorProps,
  withAuthenticator,
} from '@aws-amplify/ui-react'
import { API, Hub } from 'aws-amplify'
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

const initialState = { name: '', price: 0, cost: 0, description: '' }

type Alert = {
  id: string
  variation: 'error' | 'warning'
  heading?: string
  body: string
}

const Index = ({ signOut, user }: WithAuthenticatorProps) => {
  const [formState, setFormState] = useState(initialState)
  const [products, setProducts] = useState<Product[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isMutating, setMutating] = useState<boolean>(false)

  Hub.listen('api', (data: any) => {
    const { payload } = data
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const connectionState = payload.data.connectionState as ConnectionState
      console.log('connectionState', connectionState)
    }
  })

  useEffect(() => {
    fetchProducts()
    const sub = API.graphql<GraphQLSubscription<OnCreateProductSubscription>>({
      query: subscriptions.onCreateComment,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }).subscribe(fetchProducts)
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
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
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
    const prevProducts = products
    try {
      if (!formState.name || !formState.description) return
      setMutating(true)
      const productDeatils: CreateProductInput = { ...formState }
      setProducts([...products, productDeatils as Product])
      setFormState(initialState)
      await API.graphql<GraphQLQuery<CreateProductMutation>>({
        query: mutations.createProduct,
        variables: { input: productDeatils },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      setMutating(false)
    } catch (error) {
      console.log('Error creating products', error)
      setProducts(prevProducts)
      setMutating(false)
      const res = error as GraphQLResult
      const newAlerts: Alert[] =
        res.errors?.map(error => {
          return {
            id: '' + Date.now(),
            variation: 'error',
            body: error.message,
          }
        }) ?? []
      setAlerts([...newAlerts, ...alerts])
    }
  }

  async function deleteProduct(productId: string) {
    const prevProducts = products
    try {
      setMutating(true)
      setProducts(products.filter(product => product.id !== productId))
      await API.graphql<GraphQLQuery<DeleteProductMutation>>({
        query: mutations.deleteProduct,
        variables: { input: { id: productId } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      setMutating(false)
    } catch (error) {
      console.log('Error deleting product', error)
      setProducts(prevProducts)
      setMutating(false)
      const res = error as GraphQLResult
      const newAlerts: Alert[] =
        res.errors?.map(error => {
          return {
            id: '' + Date.now(),
            variation: 'error',
            body: error.message,
          }
        }) ?? []
      setAlerts([...newAlerts, ...alerts])
    }
  }

  function dismissAlert(alertId: string) {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  return (
    <View margin="1rem">
      <Flex direction="column">
        {alerts.map(alert => (
          <UIAlert
            key={alert.id}
            isDismissible={true}
            variation={alert.variation}
            heading={alert.heading}
            onDismiss={() => dismissAlert(alert.id)}
          >
            {alert.body}
          </UIAlert>
        ))}
        <Flex justifyContent="space-between" alignItems="center">
          <Heading level={3}>產品管理</Heading>
          <Flex alignItems="center">
            <Heading level={6}>{user?.username}</Heading>
            <Button variation="link" size="small" onClick={signOut}>
              登出
            </Button>
          </Flex>
        </Flex>

        <Flex direction="column" maxWidth="32rem" width="100%">
          <TextField
            placeholder="Product name"
            label="名稱"
            errorMessage="There is an error"
            onChange={event => setInput('name', event.target.value)}
            value={formState.name}
          />
          <TextField
            placeholder="不可低於成本"
            label="價格"
            errorMessage="There is an error"
            onChange={event => setInput('price', event.target.value)}
            value={formState.price}
          />
          <TextField
            placeholder="不可低於0"
            label="成本"
            errorMessage="There is an error"
            onChange={event => setInput('cost', event.target.value)}
            value={formState.cost}
          />
          <TextField
            placeholder="Product description"
            label="描述"
            errorMessage="There is an error"
            onChange={event => setInput('description', event.target.value)}
            value={formState.description}
          />
          <Button
            isDisabled={isMutating}
            onClick={createProduct}
            variation="primary"
          >
            建立產品
          </Button>
        </Flex>
        <Divider orientation="horizontal" />

        <Table caption="" highlightOnHover={true}>
          <TableHead>
            <TableRow>
              <TableCell as="th">名稱</TableCell>
              <TableCell as="th">價格</TableCell>
              <TableCell as="th">成本</TableCell>
              <TableCell as="th">描述</TableCell>
              <TableCell as="th">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id ?? index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.cost}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Button
                    variation="link"
                    isDisabled={isMutating}
                    onClick={() => deleteProduct(product.id)}
                  >
                    刪除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    </View>
  )
}

export default withAuthenticator(Index)
