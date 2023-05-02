import { GRAPHQL_AUTH_MODE, GraphQLQuery } from '@aws-amplify/api'
import {
  WithAuthenticatorProps,
  withAuthenticator,
} from '@aws-amplify/ui-react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import RefreshIcon from '@mui/icons-material/Refresh'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { API, DataStore, Predicates } from 'aws-amplify'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

import { PublishProductQuery, PublishProductQueryVariables } from '@/src/API'
import Layout from '@/src/components/Layout'
import WrappedBreadcrumbs from '@/src/components/WrappedBreadcrumbs'
import * as queries from '@/src/graphql/queries'
import { Product } from '@/src/models'
import ProductDataGrid from './ProductDataGrid'

function Index({ user }: WithAuthenticatorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [products, setProducts] = useState<Product[]>([])
  const [isMutating, setMutating] = useState<boolean>(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  console.log('user', user)

  // Hub.listen('api', (data: any) => {
  //   const { payload } = data
  //   if (payload.event === CONNECTION_STATE_CHANGE) {
  //     const connectionState = payload.data.connectionState as ConnectionState
  //     console.log('connectionState', connectionState)
  //   }
  // })

  // Hub.listen('auth', async (data: any) => {
  //   if (data.payload.event === 'signOut') {
  //     await DataStore.clear()
  //   }
  // })

  // Hub.listen('datastore', async (data: any) => {
  //   console.log('datastore event', data.payload)
  // })

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
        limit: 30,
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

  async function publishProduct(productId: string) {
    console.log('publish product', productId)
    try {
      const variables: PublishProductQueryVariables = {
        productId: productId,
      }
      const res = await API.graphql<GraphQLQuery<PublishProductQuery>>({
        query: queries.publishProduct,
        variables: variables,
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
        // authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        // authToken: user?.getSignInUserSession()?.getAccessToken().getJwtToken(),
      })
      console.log('res', res)
      console.log(res.data?.publishProduct)
    } catch (error) {
      console.log('Error publishing product', error)
    }
  }

  return (
    <Layout>
      <WrappedBreadcrumbs
        links={[{ children: '首頁', href: '/' }, { children: '產品列表' }]}
      />
      <Stack direction="column" py={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row">
            <Typography variant="h6">商品列表</Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            {matches && (
              <Button
                variant="outlined"
                color="inherit"
                LinkComponent={NextLink}
                href="/products"
              >
                <RefreshIcon />
              </Button>
            )}
            {matches && (
              <Button
                // disabled={true}
                variant="outlined"
                color="inherit"
                onClick={handleClick}
                endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              >
                動作
              </Button>
            )}
            {matches && (
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
            )}
            {matches && (
              <Button
                // disabled={true}
                variant="outlined"
                color="inherit"
                LinkComponent={NextLink}
                href="/products/create"
              >
                刪除
              </Button>
            )}
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
      <Box sx={{ width: '100%' }}>
        <ProductDataGrid
          products={products}
          onDeleteButtonClick={deleteProduct}
          onPublishButtonClick={publishProduct}
        />
      </Box>
    </Layout>
  )
}

export default withAuthenticator(Index)
