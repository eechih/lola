import { FileUploader } from '@aws-amplify/ui-react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DataStore, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import WrappedBreadcrumbs from '@/src/components/WrappedBreadcrumbs'
import { Image, Product, ProductStatus } from '@/src/models'
import Layout from '../../src/components/Layout'

type ProductForm = {
  name: string
  price: string
  cost: string
  description: string
  file?: File
}

const initialFormData: ProductForm = {
  name: '',
  price: '0',
  cost: '0',
  description: '',
}

export default function Index() {
  const router = useRouter()
  const productId = router.query.productId as string
  const isEdition = productId !== 'create'

  const [message, setMessage] = useState('')

  const onSuccess = (event: { key: string }) => {
    console.log(event.key)
    setMessage(`Key: ${event.key}`)
  }

  const { reset, handleSubmit, control, formState } = useForm<ProductForm>({
    defaultValues: initialFormData,
  })

  useEffect(() => {
    const loadData = async () => {
      console.log('loadData')
      try {
        const product = await DataStore.query(Product, productId)
        console.log(product)
        const formData: ProductForm = {
          name: product?.name ?? '',
          price: product?.price?.toString() ?? '',
          cost: product?.cost?.toString() ?? '',
          description: product?.description ?? '',
        }
        reset(formData)
      } catch (err) {
        console.log(err)
      }
    }

    if (isEdition && productId) loadData()
  }, [isEdition, productId, reset])

  const onSubmit = async (data: ProductForm) => {
    console.log('onSubmit', data)
    const { name, price, cost, description, file } = data
    if (!name || !description) return
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
      const product = await DataStore.save(new Product(input))
      await DataStore.save(
        new Image({
          url: filename,
          product: product,
        })
      )
      router.push('/products')
    } catch (error) {
      console.log('Error creating products', error)
    }
  }

  return (
    <Layout>
      <Container disableGutters sx={{ marginLeft: 0 }}>
        <WrappedBreadcrumbs
          links={[
            { children: '首頁', href: '/' },
            { children: '產品列表', href: '/products' },
            { children: isEdition ? '編輯產品' : '建立產品' },
          ]}
        />

        <Stack direction="row" paddingBottom={2}>
          <Typography variant="h5">
            {isEdition ? '編輯產品' : '建立產品'}
          </Typography>
        </Stack>

        <Paper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2} padding={2}>
              <Controller
                name="name"
                control={control}
                rules={{ required: '必須提供名稱' }}
                render={({ field, fieldState }) => (
                  <TextField
                    autoFocus
                    id={field.name}
                    label="名稱"
                    type="txt"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                rules={{
                  required: '必須提供售價',
                  min: { value: 0, message: '售價不可小於零' },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="價格"
                    type="number"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="cost"
                control={control}
                rules={{
                  min: { value: 0, message: '成本不可小於零' },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="成本"
                    type="number"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    id={field.name}
                    label="描述"
                    type="text"
                    {...field}
                  />
                )}
              />
              <Typography>上傳圖片</Typography>
              <FileUploader
                onSuccess={onSuccess}
                variation="drop"
                acceptedFileTypes={['image/*']}
                accessLevel="private"
              />
            </Stack>
          </form>
        </Paper>
        <Stack direction="row" justifyContent="end" marginTop={2}>
          <Button color="inherit" onClick={() => router.push('/products')}>
            取消
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            // disabled={!formState.isDirty || !formState.isValid}
          >
            {isEdition ? '儲存變更' : '建立產品'}
          </Button>
        </Stack>
      </Container>
    </Layout>
  )
}
