import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import RefreshIcon from '@mui/icons-material/Refresh'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
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
import { DataStore, Hub, Predicates } from 'aws-amplify'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

import WrappedBreadcrumbs from '@/src/components/WrappedBreadcrumbs'
import { Product } from '@/src/models'
import Layout from '../../src/components/Layout'

export default function Index() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [products, setProducts] = useState<Product[]>([])
  const [isMutating, setMutating] = useState<boolean>(false)
  const theme = useTheme()

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
                LinkComponent={NextLink}
                href="/products"
              >
                <RefreshIcon />
              </Button>
              <Button
                // disabled={true}
                variant="outlined"
                color="inherit"
                onClick={handleClick}
                endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
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
                <MenuList>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <FileCopyIcon />
                    </ListItemIcon>
                    <Typography variant="body2">複製項目</Typography>
                  </MenuItem>
                </MenuList>
              </Menu>

              <Button
                // disabled={true}
                variant="outlined"
                color="inherit"
                LinkComponent={NextLink}
                href="/products/create"
              >
                刪除
              </Button>
              <Button
                variant="contained"
                disabled={isMutating}
                LinkComponent={NextLink}
                href="/products/create"
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
                      <Typography
                        component={NextLink}
                        href={`/products/${id}`}
                        variant="body2"
                        sx={{ color: theme.palette.info.main }}
                      >
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
