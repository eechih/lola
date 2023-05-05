import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import axios, { Axios } from 'axios'

const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'

export type Cookie = {
  name: string
  value: string
  path?: string
  domain?: string
  expires?: number
  samSite?: 'Strict' | 'Lax' | 'None'
  secure?: boolean
  [property: string]: any
}

export const convertToAxiosCookie = (cookies: Cookie[]): string => {
  return cookies.map(coolie => `${coolie.name}=${coolie.value}`).join('; ')
}

export type CreateAxiosProps = {
  baseUrl?: string
  cookies?: Cookie[]
  userAgent?: string // default
  timeout?: number // unit: milliseconds, defult: 5000
  withCredentials?: boolean // default true
}

export const createAxios = (props: CreateAxiosProps): Axios => {
  const {
    baseUrl,
    cookies,
    timeout = 5000,
    withCredentials = true,
    userAgent = USER_AGENT,
  } = props

  const instance = axios.create({
    headers: { 'User-Agent': userAgent },
    timeout: timeout,
    withCredentials: withCredentials,
  })

  if (baseUrl) instance.defaults.baseURL = baseUrl

  if (cookies) {
    const cookie = convertToAxiosCookie(cookies)
    instance.interceptors.request.use(
      config => {
        config.headers.set('Cookie', cookie)
        return config
      },
      error => Promise.reject(error)
    )
  }
  return instance
}

export const putObject = async (
  s3: S3Client,
  props: { bucket: string; key: string; body: string }
) => {
  console.log('putObject...', props)
  const { bucket, key, body } = props
  try {
    await s3.send(
      new PutObjectCommand({ Bucket: bucket, Key: key, Body: body })
    )
    console.log('Successfully put object to S3.', key)
  } catch (err) {
    console.log('Error', err)
    throw err
  }
}

export const getObject = async (
  s3: S3Client,
  props: { bucket: string; key: string }
): Promise<string> => {
  console.log('getObject...', props)
  const { bucket, key } = props
  try {
    const response = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    )
    const body = (await response.Body?.transformToString()) ?? ''
    return body
  } catch (err) {
    console.log('Error', err)
    throw err
  }
}
