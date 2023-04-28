import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteIcon from '@mui/icons-material/Delete'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import PublishIcon from '@mui/icons-material/Publish'
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
import {
  DataGrid,
  GridActionsCellItem,
  GridRenderCellParams,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import { DataStore, Predicates } from 'aws-amplify'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

import Layout from '@/src/components/Layout'
import WrappedBreadcrumbs from '@/src/components/WrappedBreadcrumbs'
import { Product } from '@/src/models'

export default function Index() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [products, setProducts] = useState<Product[]>([])
  const [isMutating, setMutating] = useState<boolean>(false)
  const theme = useTheme()

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
  const Link = (props: { href: string; children: React.ReactNode }) => {
    return (
      <Typography
        component={NextLink}
        href={props.href}
        variant="body2"
        sx={{ color: theme.palette.primary.main }}
      >
        {props.children}
      </Typography>
    )
  }

  const currencyFormatter = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
  })

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
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={products}
          columns={[
            {
              field: 'id',
              headerName: 'ID',
              width: 110,
              valueGetter: (params: GridValueGetterParams) =>
                `${params.row.id?.substring(0, 8) ?? ''}`,
              renderCell: (params: GridRenderCellParams) => (
                <Link href={`/products/${params.row.id}`}>
                  {params.row.id.substring(0, 8)}
                </Link>
              ),
            },
            {
              field: 'name',
              headerName: '名稱',
              flex: 1,
              minWidth: 200,
              maxWidth: 500,
              editable: true,
            },
            {
              field: 'price',
              headerName: '售價',
              type: 'number',
              editable: true,
              valueFormatter: ({ value }) => currencyFormatter.format(value),
            },
            {
              field: 'cost',
              headerName: '成本',
              type: 'number',
              editable: true,
              valueFormatter: ({ value }) => currencyFormatter.format(value),
            },
            {
              field: 'provider',
              headerName: '供應商',
              minWidth: 60,
              editable: true,
              type: 'singleSelect',
              valueFormatter: ({ value }) => value,
              valueOptions: [
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
              ],
            },
            {
              field: 'offShelfTime',
              headerName: '下架時間',
              // type: 'date',
              // valueGetter: ({ value }) => value && new Date(value),
              width: 140,
              editable: true,
            },
            {
              field: 'actions',
              type: 'actions',
              getActions: params => [
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="刪除"
                  onClick={() => deleteProduct(params.id.toString())}
                  key="delet"
                  disabled={true}
                />,
                <GridActionsCellItem
                  icon={<PublishIcon />}
                  label="發佈"
                  onClick={() => console.log('Publish', params.id)}
                  key="publish"
                />,
              ],
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </Layout>
  )
}
