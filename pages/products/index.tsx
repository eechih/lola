import { GraphQLResult } from '@aws-amplify/api'
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub'
import {
  WithAuthenticatorProps,
  withAuthenticator,
} from '@aws-amplify/ui-react'
import ArchiveIcon from '@mui/icons-material/Archive'
import EditIcon from '@mui/icons-material/Edit'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { DataStore, Hub, Predicates, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsArrowClockwise } from 'react-icons/bs'

import WrappedBreadcrumbs from '@/src/components/WrappedBreadcrumbs'
import { Image, Product, ProductStatus } from '@/src/models'
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [products, setProducts] = useState<Product[]>([])
  const [isMutating, setMutating] = useState<boolean>(false)
  const theme = useTheme()
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
    }
  }

  return (
    <Layout>
      <WrappedBreadcrumbs
        links={[{ children: '首頁', href: '/' }, { children: '產品列表' }]}
      />
      <Paper>
        <Stack direction="column" padding={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row">
              <Typography variant="h6">商品列表</Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => router.push('/products')}
                size="small"
              >
                <BsArrowClockwise />
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleClick}
                size="small"
              >
                動作
              </Button>
              <Menu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <FileCopyIcon />
                  Duplicate
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                  <ArchiveIcon />
                  Archive
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <MoreHorizIcon />
                  More
                </MenuItem>
              </Menu>

              <Button
                disabled={true}
                onClick={() => router.push('/products/create')}
                size="small"
              >
                刪除
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push('/products/create')}
                disabled={isMutating}
                size="small"
              >
                建立產品
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>名稱</TableCell>
                <TableCell>價格</TableCell>
                <TableCell>成本</TableCell>
                <TableCell>描述</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map(product => {
                const { id, name, price, cost, description } = product
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#1976d2' }}>
                        {id.substring(0, 8)}
                      </Typography>
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>{cost}</TableCell>
                    <TableCell>{description}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Layout>
  )
}

export default withAuthenticator(Index)
