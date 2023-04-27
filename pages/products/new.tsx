import { GraphQLResult } from '@aws-amplify/api'
import {
  Button,
  Flex,
  TextField,
  Alert as UIAlert,
} from '@aws-amplify/ui-react'
import { DataStore, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import WrappedBreadcrumbs from '@/src/components/WrappedBreadcrumbs'
import { Image, Product, ProductStatus } from '@/src/models'
import Layout from './Layout'

type ProductForm = {
  name: string
  price: string
  cost: string
  description: string
  file?: File
}

const initialState: ProductForm = {
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
  const [products, setProducts] = useState<Product[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isMutating, setMutating] = useState<boolean>(false)
  const { register, handleSubmit, control } = useForm<ProductForm>({
    defaultValues: initialState ?? {},
  })

  async function createProduct(data: ProductForm) {}

  function dismissAlert(alertId: string) {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  const onSubmit = async (data: ProductForm) => {
    console.log('onSubmit', data)
    const { name, price, cost, description, file } = data
    if (!name || !description) return
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

  return (
    <Layout>
      <WrappedBreadcrumbs
        links={[
          { children: '首頁', href: '/' },
          { children: '產品列表', href: '/products' },
          { children: '建立產品' },
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id={field.name}
                label="名稱"
                type="txt"
                {...field}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id={field.name}
                label="價格"
                type="number"
                {...field}
              />
            )}
          />
          <Controller
            name="cost"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id={field.name}
                label="成本"
                type="number"
                {...field}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id={field.name}
                label="描述"
                type="text"
                {...field}
              />
            )}
          />

          <Button isDisabled={isMutating} type="submit" variation="primary">
            建立產品
          </Button>
        </form>
      </Flex>
    </Layout>
  )
}

export default Index
