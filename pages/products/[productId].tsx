import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { DataStore } from 'aws-amplify'
import moment from 'moment'
import { useRouter } from 'next/router'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Layout from '@/src/components/Layout'
import StorageManager, {
  HashHexFileNameStrategy,
} from '@/src/components/StorageManager'
import WrappedBreadcrumbs from '@/src/components/WrappedBreadcrumbs'
import { Image, Product, ProductStatus } from '@/src/models'

const providers = [
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
  images: Pick<Image, 'key'>[]
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
  images: [],
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function Index() {
  const router = useRouter()
  const productId = router.query.productId as string
  const isEdition = productId !== 'create'
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  // console.log('matches', matches)
  // console.log('initialFormData', initialFormData)
  const { reset, handleSubmit, control, formState, getValues } =
    useForm<ProductForm>({
      defaultValues: initialFormData,
    })

  useEffect(() => {
    const loadData = async () => {
      console.log('loadData')
      try {
        const product = await DataStore.query(Product, productId)
        console.log('product', product)
        if (product) {
          const images = await product.images.toArray()
          console.log('images', images)
          reset({
            name: product.name,
            price: product.price?.toString(),
            cost: product.cost?.toString(),
            provider: product.provider ?? '',
            offShelfDate: moment(product.offShelfTime).format('yyyy-MM-DD'),
            offShelfTime: moment(product.offShelfTime).format('HH:mm'),
            description: product.description ?? '',
            option: '',
            images: images,
          } as ProductForm)
          product?.images
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (isEdition && productId) loadData()
  }, [isEdition, productId, reset])

  const onSubmit = async () =>
    isEdition ? await updateProdcut() : await createProduct()

  const createProduct = async () => {
    const formData = getValues()
    if (!formData.name || !formData.price) return
    try {
      const input = {
        name: formData.name,
        price: Number(formData.price),
        cost: Number(formData.cost),
        description: formData.description,
        provider: formData.provider,
        status: ProductStatus.ACTIVE,
        offShelfTime: moment(
          formData.offShelfDate + 'T' + formData.offShelfTime
        ).toISOString(),
        createdAt: new Date().toISOString(),
      }

      console.log('product', input)
      const product = await DataStore.save(new Product(input))
      // await Promise.all(
      //   Object.keys(files).map(async key => {
      //     await DataStore.save(
      //       new Image({
      //         product: product,
      //         key: key,
      //       })
      //     )
      //   })
      // )

      enqueueSnackbar('新增成功!', {
        variant: 'success',
        autoHideDuration: 2000,
      })
      router.push('/products')
    } catch (error) {
      console.log('Error creating products', error)
    }
  }
  const updateProdcut = async () => {
    const formData = getValues()
    const original = await DataStore.query(Product, productId)
    if (original) {
      await DataStore.save(
        Product.copyOf(original, updated => {
          if (formState.dirtyFields?.name) updated.name = formData.name
          if (formState.dirtyFields?.price)
            updated.price = Number(formData.price)
          if (formState.dirtyFields?.cost) updated.cost = Number(formData.cost)
          if (formState.dirtyFields?.description)
            updated.description = formData.description
          if (formState.dirtyFields?.provider)
            updated.provider = formData.provider
          if (
            formState.dirtyFields?.offShelfDate ||
            formState.dirtyFields?.offShelfTime
          )
            updated.offShelfTime = moment(
              formData.offShelfDate + 'T' + formData.offShelfTime
            ).toISOString()
        })
      )
    }
    enqueueSnackbar('儲存成功!', {
      variant: 'success',
      autoHideDuration: 2000,
    })
  }

  if (!router.isReady) return <div>Loading...</div>

  return (
    <Layout>
      <SnackbarProvider />
      <Container disableGutters sx={{ marginLeft: 0 }}>
        <WrappedBreadcrumbs
          links={[
            { children: '首頁', href: '/' },
            { children: '產品列表', href: '/products' },
            { children: isEdition ? '編輯產品' : '建立產品' },
          ]}
        />

        <Stack
          direction="row"
          py={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {isEdition ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6">產品</Typography>
              <Typography variant="body1">
                {matches ? productId : productId.substring(0, 8)}
              </Typography>
            </Stack>
          ) : (
            <Typography variant="h6">建立產品</Typography>
          )}
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <Paper
                  variant={matches ? 'outlined' : 'elevation'}
                  elevation={0}
                >
                  <Grid container spacing={2} padding={matches ? 2 : 0}>
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
                            {providers.map((option, index) => (
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

              <Grid xs={12} md={6}>
                <Paper
                  variant={matches ? 'outlined' : 'elevation'}
                  elevation={0}
                >
                  <Grid container spacing={2} padding={matches ? 2 : 0}>
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
                <Paper
                  variant={matches ? 'outlined' : 'elevation'}
                  elevation={0}
                >
                  <Grid container spacing={2} padding={matches ? 2 : 0}>
                    <Grid>
                      <Typography variant="h6">產品圖片</Typography>
                    </Grid>
                    <Grid xs={12}>
                      <StorageManager
                        acceptedFileTypes={['image/*']}
                        accessLevel="private"
                        defaultFiles={getValues().images}
                        processFile={HashHexFileNameStrategy}
                        cacheExpires={15000}
                        onUploadSuccess={({ key }) => {
                          if (isEdition) {
                          } else {
                            reset({ ...getValues() })
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid xs={12}></Grid>
            </Grid>
          </Box>
        </form>
        <Stack direction="row" justifyContent="end" spacing={2}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => router.push('/products')}
          >
            取消
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={!formState.isDirty}
            loading={formState.isSubmitting}
          >
            {isEdition ? '儲存變更' : '建立產品'}
          </LoadingButton>
        </Stack>
      </Container>
    </Layout>
  )
}
