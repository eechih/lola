import {
  Button,
  FileUploader,
  Flex,
  Heading,
  Text,
  TextField,
  ToggleButton,
  View,
} from '@aws-amplify/ui-react'
import { DataStore } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Product } from '../../src/models'
import Breadcrumb from './Breadcrumb'
import Layout from './Layout'
import Paper from './Paper'

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
    console.log('submit', data)
  }

  return (
    <Layout>
      <Breadcrumb
        breadcrumbs={[
          { label: '首頁', href: '/' },
          { label: '產品列表', href: '/products' },
          { label: isEdition ? '編輯產品' : '建立產品' },
        ]}
      />

      <Flex direction="row" paddingBottom={16}>
        <Heading level={3}>{isEdition ? '編輯產品' : '建立產品'}</Heading>
      </Flex>

      <View minWidth={280} maxWidth={1280}>
        <Paper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
              direction="column"
              paddingRight={20}
              paddingLeft={20}
              paddingTop={12}
              paddingBottom={12}
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: '必須提供名稱' }}
                render={({ field, fieldState }) => (
                  <TextField
                    autoFocus
                    isRequired={true}
                    margin="dense"
                    id={field.name}
                    label={
                      <Text style={{ position: 'relative' }}>
                        名稱
                        <Text
                          as="span"
                          fontSize="0.8rem"
                          color="red"
                          fontStyle="italic"
                          style={{ position: 'absolute', top: -4 }}
                        >
                          *
                        </Text>
                      </Text>
                    }
                    type="txt"
                    {...field}
                    hasError={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
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
                    margin="dense"
                    id={field.name}
                    label={
                      <Text style={{ position: 'relative' }}>
                        價格
                        <Text
                          as="span"
                          fontSize="0.8rem"
                          color="red"
                          fontStyle="italic"
                          style={{ position: 'absolute', top: -4 }}
                        >
                          *
                        </Text>
                      </Text>
                    }
                    type="number"
                    {...field}
                    hasError={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
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
                    margin="dense"
                    id={field.name}
                    label="成本"
                    type="number"
                    {...field}
                    hasError={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="dense"
                    id={field.name}
                    label="描述"
                    type="text"
                    {...field}
                  />
                )}
              />
              <Text>上傳圖片</Text>
              <FileUploader
                onSuccess={onSuccess}
                variation="drop"
                acceptedFileTypes={['image/*']}
                accessLevel="private"
              />
              <FileUploader
                onSuccess={onSuccess}
                variation="drop"
                acceptedFileTypes={['image/*']}
                accessLevel="private"
              />
              <FileUploader
                onSuccess={onSuccess}
                variation="drop"
                acceptedFileTypes={['image/*']}
                accessLevel="private"
              />
              <FileUploader
                onSuccess={onSuccess}
                variation="drop"
                acceptedFileTypes={['image/*']}
                accessLevel="private"
              />
              <FileUploader
                onSuccess={onSuccess}
                variation="drop"
                acceptedFileTypes={['image/*']}
                accessLevel="private"
              />
            </Flex>
          </form>
        </Paper>
        <Flex justifyContent="end" marginTop={16}>
          <ToggleButton
            variation="menu"
            onClick={() => router.push('/products')}
          >
            取消
          </ToggleButton>
          <Button
            type="submit"
            variation="primary"
            onClick={handleSubmit(onSubmit)}
            isDisabled={!formState.isDirty}
          >
            {isEdition ? '儲存變更' : '建立產品'}
          </Button>
        </Flex>
      </View>
    </Layout>
  )
}
