import { Axios } from 'axios'
import * as cheerio from 'cheerio'
import FormData from 'form-data'
import { ClientRequest } from 'http'
import moment from 'moment'

import { Product } from './models'

export const ADMIN_PAGE_URL =
  'https://s18.buyplus1.com.tw/b/1301023989915468/admin/index.php'

export const obtainToken = async (
  axiosInstace: Axios
): Promise<string | null> => {
  console.log('obtainToken...')
  const response = await axiosInstace.get('/')
  const request: ClientRequest = response.request
  const url = `${request.protocol}//${request.host}${request.path}`
  const token = new URL(url).searchParams.get('token')
  return token
}

export const publishProduct = async (
  axiosInstace: Axios,
  token: string,
  props: { product: Product }
) => {
  const { product } = props
  console.log('publishProduct...', product)
  const { productId } = await createEmptyProduct(axiosInstace, token)
  await updateProduct(axiosInstace, token, { productId, product })
}

const createEmptyProduct = async (
  axiosInstace: Axios,
  token: string
): Promise<{ productId: string }> => {
  console.log('createEmptyProduct...')
  const temporaryName = moment().unix()

  let res = await axiosInstace.get(`?route=catalog/product/add&token=${token}`)
  let $ = cheerio.load(res.data)
  const productId = $('input[type="hidden"][name="product_id"]').val()
  const microtime = $('input[type="hidden"][name="microtime"]').val()
  const dateModified = $('input[type="hidden"][name="date_modified"]').val()

  const form = new FormData()
  form.append('product_id', productId)
  form.append('microtime', microtime)
  form.append('date_modified', dateModified)
  form.append('product_description[1][name]', temporaryName)
  form.append('price', 1)
  form.append('cost', 0)
  form.append('quantity', 0)
  form.append('status', 1)
  form.append('image', '')
  form.append('product_description[1][description]', '')
  form.append('fb_groups_id', '913862951959460')
  form.append('location', '')
  form.append('shipping', 1)
  form.append('allow_import', 1)
  form.append('type', 1)
  form.append('product_store[]', 0)
  form.append('minimum', 1)
  form.append('subtract', 1)
  res = await axiosInstace.post(
    `?route=catalog/product/saveProduct&token=${token}`,
    form
  )

  res = await axiosInstace.get(
    `?route=catalog/product&token=${token}&sort=p.product_id&order=DESC&filter_name=${temporaryName}`
  )
  $ = cheerio.load(res.data)
  const newProductId = $(
    'input[type="checkbox"].productSelected'
  ).val() as string

  if (!newProductId) {
    console.error('Failed to create empty product.', res.status, res.data)
    throw new Error('Failed to create empty product.')
  }

  const result = { productId: newProductId }
  console.log('Successfully created empty product.', result)
  return result
}

type UpdateProductProps = {
  productId: string
  product: Product
}

const updateProduct = async (
  axiosInstance: Axios,
  token: string,
  props: UpdateProductProps
) => {
  console.log('updateProduct...', props)
  const { productId, product } = props

  try {
    const res = await axiosInstance.get(
      `?route=catalog/product/edit&product_id=${productId}&token=${token}`
    )
    const $ = cheerio.load(res.data)
    const microtime = $('input[type="hidden"][name="microtime"]').val()
    const dateModified = $('input[type="hidden"][name="date_modified"]').val()

    const replacedName = product.name?.replace(
      '{{product-id}}',
      `S1-${productId}`
    )
    const updatedDescription = product.description?.replace(
      '{{product-id}}',
      `S1-${productId}`
    )
    const form = new FormData()
    form.append('product_id', productId)
    form.append('microtime', microtime ?? '')
    form.append('date_modified', dateModified ?? '')
    form.append('product_description[1][name]', replacedName)
    form.append('price', product.price)
    form.append('cost', product.cost)
    form.append('quantity', 0)
    form.append('status', 1)
    form.append('image', '')
    form.append('product_description[1][description]', updatedDescription)
    form.append('fb_groups_id', '913862951959460')
    form.append(
      'product_status_date',
      moment(product.offShelfTime).format('YYYY-MM-DD HH:mm')
    )
    form.append('location', product.provider)
    form.append('shipping', 1)
    form.append('allow_import', 1)
    form.append('type', 1)
    form.append('product_store[]', 0)
    form.append('minimum', 1)
    form.append('subtract', 1)

    const saveProductResp = await axiosInstance.post(
      `?route=catalog/product/saveProduct&token=${token}`,
      form
    )

    if (!saveProductResp.data.success) throw new Error(saveProductResp.data)

    // if (data.option)
    //   await this.saveProductOption({ productOption: data.option })

    // if (data.images)
    //   await this.updateProductImage({ imageUrl: data.images[0] })

    console.log('Successfully updated product.')
  } catch (err) {
    console.error('Failed to update product.', err)
    throw new Error('Failed to update product.')
  }
}
