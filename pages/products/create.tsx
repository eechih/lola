import { GraphQLResult } from '@aws-amplify/api'
import {
  Button,
  Flex,
  Heading,
  TextField,
  Alert as UIAlert,
} from '@aws-amplify/ui-react'
import { DataStore, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

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

const Index = () => {
  const router = useRouter()
  const [formState, setFormState] = useState<CreateForm>(initialState)
  const [products, setProducts] = useState<Product[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isMutating, setMutating] = useState<boolean>(false)

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
      router.push('/products')
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

  function dismissAlert(alertId: string) {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  return (
    <Layout>
      <Breadcrumb
        breadcrumbs={[
          { label: '首頁', href: '/' },
          { label: '產品列表', href: '/products' },
          { label: '建立產品' },
        ]}
      />
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
      </Flex>
    </Layout>
  )
}

export default Index
