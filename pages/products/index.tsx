import { GraphQLResult } from '@aws-amplify/api'
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub'
import {
  Button,
  CheckboxField,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  Alert as UIAlert,
  View,
  WithAuthenticatorProps,
  useTheme,
  withAuthenticator,
} from '@aws-amplify/ui-react'
import { DataStore, Hub, Predicates, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsArrowClockwise } from 'react-icons/bs'

import { Image, Product, ProductStatus } from '../../src/models'
import Breadcrumb from './Breadcrumb'
import Layout from './Layout'

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
  const { tokens } = useTheme()
  const router = useRouter()

  Hub.listen('api', (data: any) => {
    const { payload } = data
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const connectionState = payload.data.connectionState as ConnectionState
      console.log('connectionState', connectionState)
    }
  })

  Hub.listen('auth', async (data: any) => {
    if (data.payload.event === 'signOut') {
      await DataStore.clear()
    }
  })

  Hub.listen('datastore', async (data: any) => {
    console.log('datastore event', data.payload)
  })

  useEffect(() => {
    const loadData = async () => setProducts(await listProducts())

    loadData()
    const sub = DataStore.observeQuery(Product, Predicates.ALL).subscribe(
      value => {
        console.log('observerOrNext', value)
        loadData()
      }
    )
    return () => sub.unsubscribe()
  }, [])

  type ListProductsResult = {
    items: Product[]
    limit: number
    nextToken?: string
  }

  async function listProducts(props?: {
    nextToken?: string
    limit?: number
  }): Promise<Product[]> {
    console.log('listProducts', props)
    const { nextToken, limit = 10 } = props ?? {}
    try {
      const products = await DataStore.query(Product, Predicates.ALL, {
        limit: 10,
      })
      console.log(products)

      return products
    } catch (error) {
      console.log('Error retrieving products', error)
      return []
    }
  }

  function setInput(key: string, value: string) {
    setFormState({ ...formState, [key]: value })
  }

  async function createProduct() {
    const { name, price, cost, description, file } = formState
    if (!formState.name || !formState.description) return
    setMutating(true)
    const prevProducts = products
    const filename = file?.name ?? ''

    try {
      if (file) {
        await Storage.put(file.name, file)
      }

      const input = {
        name: name,
        price: Number(price),
        cost: Number(cost),
        description: description,
        status: ProductStatus.ACTIVE,
        // specGroups: undefined,
        // images: [filename],
        createdAt: new Date().toISOString(),
      }

      console.log('product', input)
      setProducts([input as Product, ...products])
      setFormState(initialState)
      const product = await DataStore.save(new Product(input))
      await DataStore.save(
        new Image({
          url: filename,
          product: product,
        })
      )
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
      const toDelete = await DataStore.query(Product, productId)
      if (toDelete) await DataStore.delete(toDelete)
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
    <Layout>
      <Breadcrumb
        breadcrumbs={[{ label: '首頁', href: '/' }, { label: '產品列表' }]}
      />
      <View
        as="div"
        border="1px solid var(--amplify-colors-border-secondary)"
        boxShadow="1px 1px 1px 1px var(--amplify-colors-shadow-primary)"
        style={{ backgroundColor: tokens.colors.background.secondary.value }}
      >
        <Flex direction="column" style={{ padding: 12 }}>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{}}
          >
            <Flex direction="row">
              <Heading>商品列表</Heading>
            </Flex>

            <Flex direction="row">
              <Button onClick={() => router.push('/products')} size="small">
                <BsArrowClockwise />
              </Button>
              <Menu trigger={<MenuButton size="small">動作</MenuButton>}>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
              </Menu>
              <Button
                isDisabled={true}
                onClick={() => router.push('/products/create')}
                size="small"
              >
                刪除
              </Button>
              <Button
                isDisabled={isMutating}
                onClick={() => router.push('/products/create')}
                variation="primary"
                size="small"
              >
                建立產品
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          style={{ backgroundColor: tokens.colors.background.primary.value }}
        >
          <Table caption="" highlightOnHover={true}>
            <TableHead>
              <TableRow>
                <TableCell as="th">
                  <CheckboxField
                    label="all"
                    name=""
                    value=""
                    labelHidden={true}
                  />
                </TableCell>
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
                  <TableCell>
                    <CheckboxField
                      label="all"
                      name=""
                      value=""
                      labelHidden={true}
                    />
                  </TableCell>
                  <TableCell>
                    <Text
                      onClick={() => router.push(`/products/${product.id}`)}
                      color={tokens.colors.font.interactive.value}
                      style={{ cursor: 'pointer', fontWeight: 700 }}
                    >
                      {product.id?.substring(0, 6) ?? ''}
                    </Text>
                  </TableCell>
                  <TableCell>
                    {/* {product.images && (
                    <UIImage
                      height="3rem"
                      width="3rem"
                      src={product.images}
                      alt={product.id}
                    />
                  )} */}
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
      </Flex>
    </Layout>
  )
}

export default withAuthenticator(Index)
