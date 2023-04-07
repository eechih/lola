import '@/styles/globals.css'
import { Amplify } from 'aws-amplify'
import type { AppProps } from 'next/app'

import awsExports from '../src/aws-exports'

Amplify.configure(awsExports)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
