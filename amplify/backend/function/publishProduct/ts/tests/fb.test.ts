import axios from 'axios'
import { ClientRequest } from 'http'
import { Protocol } from 'puppeteer-core'

import { publishProduct } from '../buyplus1'
import { Product } from '../models'

const BP1_ADMIN_URL =
  'https://s18.buyplus1.com.tw/b/1301023989915468/admin/index.php'

const cookies: Protocol.Network.Cookie[] = [
  {
    name: 'fr',
    value:
      '0Few8IAjLjJfjw5jm.AWXga86D7dhWAmM4Grnyhvj7CzM.BkUw71.0X.AAA.0.0.BkUw73.AWXXi2JsxS8',
    domain: '.facebook.com',
    path: '/',
    expires: 1690940918.406857,
    size: 84,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'None',
    sameParty: false,
    sourceScheme: 'Secure',
    sourcePort: 443,
    priority: 'High',
  },
  {
    name: 'xs',
    value: '6%3AUTpvQmqfh8vUBg%3A2%3A1683164918%3A-1%3A11303',
    domain: '.facebook.com',
    path: '/',
    expires: 1714700917.18144,
    size: 50,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'None',
    sameParty: false,
    sourceScheme: 'Secure',
    sourcePort: 443,
    priority: 'High',
  },
  {
    name: 'datr',
    value: '9Q5TZKdcowZ5XUdDv4XsChgL',
    domain: '.facebook.com',
    path: '/',
    expires: 1717724919.181383,
    size: 28,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'None',
    sameParty: false,
    sourceScheme: 'Secure',
    sourcePort: 443,
    priority: 'High',
  },
  {
    name: 'c_user',
    value: '100000236390565',
    domain: '.facebook.com',
    path: '/',
    expires: 1714700917.181432,
    size: 21,
    httpOnly: false,
    secure: true,
    session: false,
    sameSite: 'None',
    sameParty: false,
    sourceScheme: 'Secure',
    sourcePort: 443,
    priority: 'High',
  },
  {
    name: 'wd',
    value: '800x600',
    domain: '.facebook.com',
    path: '/',
    expires: 1683769717,
    size: 9,
    httpOnly: false,
    secure: true,
    session: false,
    sameSite: 'Lax',
    sameParty: false,
    sourceScheme: 'Secure',
    sourcePort: 443,
    priority: 'High',
  },
  {
    name: 'sb',
    value: '9Q5TZNX70ilL96AiNFKHPmDb',
    domain: '.facebook.com',
    path: '/',
    expires: 1717724919.181421,
    size: 26,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'None',
    sameParty: false,
    sourceScheme: 'Secure',
    sourcePort: 443,
    priority: 'High',
  },
  // {
  //   name: 'currency',
  //   value: 'TWD',
  //   domain: '.s18.buyplus1.com.tw',
  //   path: '/',
  //   expires: 1685756921.163443,
  //   size: 11,
  //   httpOnly: false,
  //   secure: false,
  //   session: false,
  //   sameParty: false,
  //   sourceScheme: 'Secure',
  //   sourcePort: 443,
  //   priority: 'High'
  // },
  {
    name: '__Secure-PHPSESSID',
    value: 'u3ohqhmgjnvig6ff6cac14vi91',
    domain: '.s18.buyplus1.com.tw',
    path: '/b/1301023989915468/admin',
    expires: 1598716921.16341,
    size: 44,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'Lax',
    sameParty: false,
    sourceScheme: 'Secure',
    sourcePort: 443,
    priority: 'High',
  },
]

const product: Product = {
  id: '1111',
  name: '1111',
  description: '1111',
  price: 100,
  cost: 80,
  provider: 'CAT',
  offShelfTime: '2023-04-28T12:00:00+08:00',
  status: 'ACTIVE',
  owner: 'user',
  createdAt: '2023-04-28T12:00:00+08:00',
  updatedAt: '2023-04-28T12:00:00+08:00',
}

describe('helper module', () => {
  test('obtain token', async () => {
    const start = new Date()

    const cookie = cookies
      .map(coolie => `${coolie.name}=${coolie.value}`)
      .join('; ')
    console.log('cookie', cookie)

    const response = await axios.get(BP1_ADMIN_URL, {
      headers: { Cookie: cookie },
      withCredentials: true,
    })

    console.log('response.headers', response.headers)

    const request: ClientRequest = response.request
    console.log('request.protocol', request.protocol)
    console.log('request.host', request.host)
    console.log('request.path', request.path)
    const url = `${request.protocol}//${request.host}${request.path}`
    const token = new URL(url).searchParams.get('token')
    console.log('token', token)
    const end = new Date()

    console.log('start', start.getTime())
    console.log('end', end.getTime())
    console.log('time', end.getTime() - start.getTime())
  })

  test('parse url', () => {
    const protocol = 'https:'
    const host = 's18.buyplus1.com.tw'
    const path =
      '/b/1301023989915468/admin/index.php?route=common/dashboard&token=5e80580254759e3f1f3fd52d2f3ce220'
    // const url = new URL(`${protocol}//${host}${path}`)
    const url = new URL(path, `${protocol}//${host}`)
    console.log('url', url)
    console.log('params', url.searchParams)
    const token = url.searchParams.get('token')
    console.log('token', token)
  })

  test('publish product', async () => {
    await publishProduct(product)
  }, 60000)
})
