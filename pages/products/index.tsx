import { GraphQLQuery, GraphQLResult } from '@aws-amplify/api'
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub'
import {
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Pagination,
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
import { API, Hub, Storage } from 'aws-amplify'
import { ChangeEvent, useEffect, useState } from 'react'

import {
  CreateProductInput,
  CreateProductMutation,
  DeleteProductMutation,
  ListProductsByStatusQuery,
  ListProductsByStatusQueryVariables,
  ModelSortDirection,
  Product,
  ProductStatus,
} from '../../src/API'
import * as mutations from '../../src/graphql/mutations'
import * as queries from '../../src/graphql/queries'

type CreateForm = {
  name: string
  price: string
  cost: string
  description: string
  file?: File
}

const initialState: CreateForm = {
  name: '',
  price: '0',
  cost: '0',
  description: '',
}

type Alert = {
  id: string
  variation: 'error' | 'warning'
  heading?: string
  body: string
}

const Index = ({ signOut, user }: WithAuthenticatorProps) => {
  const [formState, setFormState] = useState<CreateForm>(initialState)
  const [products, setProducts] = useState<Product[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isMutating, setMutating] = useState<boolean>(false)

  const [pageTokens, setPageTokens] = useState<string[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1)
  const [hasMorePages, setHasMorePages] = useState<boolean>(true)

  Hub.listen('api', (data: any) => {
    const { payload } = data
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const connectionState = payload.data.connectionState as ConnectionState
      console.log('connectionState', connectionState)
    }
  })

  useEffect(() => {
    const loadData = async () => {
      const { items, nextToken } = await listProducts()
      setProducts(items)
      if (nextToken) setPageTokens([...pageTokens, nextToken])
      else setHasMorePages(false)
    }
    loadData()
  }, [])

  async function handleNextPage() {
    console.log('handleNextPage')
    if (hasMorePages && currentPageIndex === pageTokens.length) {
      const { items, nextToken } = await listProducts()
      setProducts(items)
      if (nextToken) setPageTokens([...pageTokens, nextToken])
      else setHasMorePages(false)
    }
    setCurrentPageIndex(currentPageIndex + 1)
  }

  async function handlePreviousPage() {
    console.log('handlePreviousPage')
    setCurrentPageIndex(currentPageIndex - 1)
  }

  async function handleChangePage(newPageIndex?: number) {
    console.log('handleChangePage', newPageIndex)
    setCurrentPageIndex(newPageIndex ?? 1)
  }

  type ListProductsResult = {
    items: Product[]
    limit: number
    nextToken?: string
  }

  async function listProducts(props?: {
    nextToken?: string
    limit?: number
  }): Promise<ListProductsResult> {
    console.log('listProducts', props)
    const { nextToken, limit = 10 } = props ?? {}
    const ret: ListProductsResult = { items: [], limit }
    try {
      const variables: ListProductsByStatusQueryVariables = {
        status: ProductStatus.ACTIVE,
        sortDirection: ModelSortDirection.DESC,
        limit: limit,
        nextToken: nextToken,
      }
      const res = await API.graphql<GraphQLQuery<ListProductsByStatusQuery>>({
        query: queries.listProductsByStatus,
        variables: variables,
      })
      console.log(res)
      const items = res.data?.listProductsByStatus?.items as Product[]
      ret.items = await Promise.all(
        items.map(async product => {
          if (product.image) {
            const image = await Storage.get(product.image)
            product.image = image
          }
          return product
        })
      )
      ret.nextToken = res.data?.listProductsByStatus?.nextToken as string
    } catch (error) {
      console.log('Error retrieving products', error)
    }
    return ret
  }

  function setInput(key: string, value: string) {
    setFormState({ ...formState, [key]: value })
  }

  async function createProduct() {
    const { name, price, cost, description, file } = formState
    if (!formState.name || !formState.description) return
    setMutating(true)
    const prevProducts = products
    try {
      const product: CreateProductInput = {
        name: name,
        price: Number(price),
        cost: Number(cost),
        description: description,
        status: ProductStatus.ACTIVE,
      }
      if (file) {
        await Storage.put(file.name, file)
        product.image = file.name
      }
      setProducts([product as Product, ...products])
      setFormState(initialState)
      await API.graphql<GraphQLQuery<CreateProductMutation>>({
        query: mutations.createProduct,
        variables: { input: product },
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
          <Flex direction="row" alignItems="center">
            <Heading level={6}>Image</Heading>
            <input
              type="file"
              accept="image/jpeg"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                console.log(event.target.files)
                setFormState({ ...formState, file: event.target.files?.[0] })
              }}
            />
          </Flex>
          <Button
            isDisabled={isMutating}
            onClick={createProduct}
            variation="primary"
          >
            建立產品
          </Button>
        </Flex>
        <Divider orientation="horizontal" />
        <Pagination
          currentPage={currentPageIndex}
          totalPages={pageTokens.length}
          hasMorePages={hasMorePages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
          onChange={handleChangePage}
        />
        <Table caption="" highlightOnHover={true}>
          <TableHead>
            <TableRow>
              <TableCell as="th">ID</TableCell>
              <TableCell as="th">圖片</TableCell>
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
                <TableCell>{product.id?.substring(0, 6) ?? ''}</TableCell>
                <TableCell>
                  {product.image && (
                    <Image
                      height="3rem"
                      width="3rem"
                      src={product.image}
                      alt={product.id}
                    />
                  )}
                </TableCell>
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
