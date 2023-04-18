import { GraphQLResult } from '@aws-amplify/api'
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
  Image as UIImage,
  View,
  WithAuthenticatorProps,
  withAuthenticator,
} from '@aws-amplify/ui-react'
import { DataStore, Hub, Predicates, Storage } from 'aws-amplify'
import { ChangeEvent, useEffect, useState } from 'react'

import { Image, Product, ProductStatus } from '../../src/models'

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

      return await Promise.all(
        products.map(async product => {
          if (product.image) {
            const image = await Storage.get(product.image)
            return Product.copyOf(product, updated => {
              updated.image = image
            })
          }
          return product
        })
      )
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
        image: filename,
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
                    <UIImage
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
