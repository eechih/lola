import { FileUploader } from '@aws-amplify/ui-react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { DataStore, Storage } from 'aws-amplify'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import WrappedBreadcrumbs from '@/src/components/WrappedBreadcrumbs'
import { Image, Product, ProductStatus } from '@/src/models'
import Layout from '../../src/components/Layout'

const currencies = [
  {
    value: '',
    label: '-',
  },
  {
    value: 'CAT',
    label: '葉貓子 日韓彩妝食品雜貨批發社團',
  },
  {
    value: 'MONEY',
    label: 'MONEY株式會社',
  },
  {
    value: 'APPLE',
    label: 'GAUK✿日韓台✿彩妝&用品&食品&銀飾等商品',
  },
  {
    value: 'MITAGO',
    label: 'Mitago商城',
  },
]

type ProductForm = {
  name: string
  price: string
  cost: string
  provider: string
  offShelfDate: string
  offShelfTime: string
  description: string
  option: string
  file?: File
}

const initialFormData: ProductForm = {
  name: '',
  price: '',
  cost: '',
  provider: 'CAT',
  offShelfDate: moment().utcOffset(8).format('yyyy-MM-DD'),
  offShelfTime: '20:00',
  option: '',
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
  console.log('initialFormData', initialFormData)
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
          provider: product?.provider ?? '',
          offShelfDate: moment(product?.offShelfTime).format('yyyy-MM-DD'),
          offShelfTime: moment(product?.offShelfTime).format('HH:mm'),
          description: product?.description ?? '',
          option: '',
        }
        console.log('formData', formData)
        reset(formData)
      } catch (err) {
        console.log(err)
      }
    }

    if (isEdition && productId) loadData()
  }, [isEdition, productId, reset])

  const onSubmit2 = async (data: ProductForm) => {
    console.log('onSubmit', data)
  }
  const onSubmit = async (data: ProductForm) => {
    console.log('onSubmit', data)
    const { name, price, cost, description, file } = data
    if (!name || !price) return
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
        provider: data.provider,
        status: ProductStatus.ACTIVE,
        offShelfTime: data.offShelfDate + 'T' + data.offShelfTime,
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
            {isEdition ? '產品ID: ' + productId : '建立產品'}
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={12} lg={6} marginY={2}>
                <Paper elevation={3}>
                  <Grid container spacing={2} padding={2}>
                    <Grid>
                      <Typography variant="h6">基本設定</Typography>
                    </Grid>
                    <Grid xs={12}>
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: '必須提供名稱' }}
                        render={({ field, fieldState }) => (
                          <TextField
                            id={field.name}
                            label="名稱"
                            type="txt"
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            required
                            fullWidth
                            autoFocus={!isEdition}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={12}>
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
                            required
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Controller
                        name="option"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            id={field.name}
                            label="規格"
                            type="txt"
                            error={fieldState.invalid}
                            helperText={
                              fieldState.error?.message ??
                              '範例：紅，黑，白 / XL，L，M'
                            }
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Controller
                        name="provider"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            id={field.name}
                            label="供應商"
                            select
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            fullWidth
                            {...field}
                          >
                            {currencies.map((option, index) => (
                              <MenuItem key={index} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid xs={12}>
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
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={6}>
                      <Controller
                        name="offShelfDate"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            id={field.name}
                            label="下架日期"
                            type="date"
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid xs={6}>
                      <Controller
                        name="offShelfTime"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            id={field.name}
                            label="下架時間"
                            type="time"
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid xs={12} lg={6} marginY={2}>
                <Paper elevation={3}>
                  <Grid container spacing={2} padding={2}>
                    <Grid>
                      <Typography variant="h6">社群貼文內容</Typography>
                    </Grid>
                    <Grid xs={12}>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            id={field.name}
                            label="描述"
                            type="text"
                            minRows={15}
                            multiline
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid xs={12} marginY={2}>
                <Paper elevation={3}>
                  <Grid container spacing={2} padding={2}>
                    <Grid>
                      <Typography variant="h6">產品圖片</Typography>
                    </Grid>
                    <Grid xs={12}>
                      <FileUploader
                        onSuccess={onSuccess}
                        variation="drop"
                        acceptedFileTypes={['image/*']}
                        accessLevel="private"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid xs={12}></Grid>
            </Grid>
          </Box>
        </form>
        <Stack direction="row" justifyContent="end" marginTop={2}>
          <Button color="inherit" onClick={() => router.push('/products')}>
            取消
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={!formState.isDirty}
          >
            {isEdition ? '儲存變更' : '建立產品'}
          </Button>
        </Stack>
      </Container>
    </Layout>
  )
}
