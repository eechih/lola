import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useTheme } from '@mui/material/styles'
import NextLink from 'next/link'
import * as React from 'react'

import { Product } from '@/src/models'
import ProductCard from './ProductCard'

type ProductDataGridProps = {
  products: Product[]
  onDeleteClick: (productId: string) => void
  onEditClick: (product: Product) => void
  onPublishClick: (productId: string) => void
}

export default function ProductDataGrid(props: ProductDataGridProps) {
  const { products, ...rest } = props
  const theme = useTheme()

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
    <Grid container spacing={2}>
      {products.map((product, index) => {
        return (
          <Grid xs={12} sm={6} key={index}>
            <ProductCard product={product} {...rest} />
          </Grid>
        )
      })}
    </Grid>
  )
}
