import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataStore, Predicates } from 'aws-amplify'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

import Layout from '@/src/components/Layout'
import { Product } from '@/src/models'
import ProductCardGrid from './ProductCardGrid'
import ProductEditDialog from './ProductEditDialog'

export default function Index() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [products, setProducts] = useState<Product[]>([])
  const [isMutating, setMutating] = useState<boolean>(false)

  const [currentProduct, setCurrentProduct] = useState<Product | null>()

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

  async function editProduct(product: Product) {
    console.log('edit product', product.id)
    setCurrentProduct(product)
  }

  async function publishProduct(productId: string) {
    console.log('publish product', productId)
  }

  return (
    <Layout>
      <Stack direction="column" py={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">商品列表</Typography>
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
      <Box sx={{ width: '100%' }}>
        <ProductCardGrid
          products={products}
          onEditClick={editProduct}
          onDeleteClick={deleteProduct}
          onPublishClick={publishProduct}
        />
      </Box>
      <ProductEditDialog
        product={currentProduct}
        onClose={() => setCurrentProduct(null)}
      />
    </Layout>
  )
}
