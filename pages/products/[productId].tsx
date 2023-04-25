import { DataStore } from 'aws-amplify'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Product } from '../../src/models'
import Breadcrumb from './Breadcrumb'
import Layout from './Layout'

export default function Index() {
  const router = useRouter()
  const productId = router.query.productId as string

  useEffect(() => {
    if (productId) fetchData(productId)
  }, [productId])

  const fetchData = async (productId: string) => {
    console.log('fetchData', productId)
    try {
      const product = await DataStore.query(Product, productId)
      console.log(product)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <Breadcrumb
        breadcrumbs={[
          { label: '首頁', href: '/' },
          { label: '產品列表', href: '/products' },
          { label: productId },
        ]}
      />
      {productId}
    </Layout>
  )
}
