import '@aws-amplify/ui-react/styles.css'
import { CacheProvider } from '@emotion/react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Amplify } from 'aws-amplify'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import createEmotionCache from '@/src/createEmotionCache'
import theme from '@/src/theme'

import awsConfig from '@/src/aws-exports'

const isLocalhost = Boolean(
  typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      ))
)

console.log('isLocalhost', isLocalhost)

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, productionRedirectSignIn] =
  awsConfig.oauth.redirectSignIn.split(',')

const [localRedirectSignOut, productionRedirectSignOut] =
  awsConfig.oauth.redirectSignOut.split(',')

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
}

Amplify.configure(updatedAwsConfig)

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
