import { FileUploader } from '@aws-amplify/ui-react'
import CloseIcon from '@mui/icons-material/Close'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import moment from 'moment'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Product } from '@/src/models'

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

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

type ProductEditDialogProps = {
  product?: Product | null
  onClose?: () => void
}

export default function ProductEditDialog(props: ProductEditDialogProps) {
  const { product, onClose } = props
  const open = !!product

  const { reset, handleSubmit, control, formState, getValues } =
    useForm<ProductForm>({
      defaultValues: initialFormData,
    })

  useEffect(() => {
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
  }, [product, reset])

  const handleClose = () => {
    onClose && onClose()
  }

  const onSuccess = (event: { key: string }) => {
    console.log(event.key)
  }

  const onSubmit = async (data: ProductForm) => {
    console.log('submit', data)
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <Paper elevation={0}>
                  <Grid container spacing={2} padding={0}>
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
                <Paper elevation={0}>
                  <Grid container spacing={2} padding={0}>
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
                <Paper elevation={0}>
                  <Grid container spacing={2} padding={0}>
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
      </Dialog>
    </div>
  )
}
