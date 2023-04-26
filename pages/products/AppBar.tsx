import { Flex, View, useTheme } from '@aws-amplify/ui-react'

import Drawer from './Drawer'
import Footer from './Footer'
import NavHeader from './NavHeader'

interface LayoutProps {
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

function Layout({ children, maxWidth = 'lg' }: LayoutProps) {
  const { tokens } = useTheme()
  return (
    <View
      // height="100vh"
      paddingTop={tokens.space.xxl}
      paddingBottom={tokens.space.xl}
      style={{
        backgroundColor: tokens.colors.background.primary.value,
      }}
    >
      <View
        style={{
          position: 'fixed',
          top: 0,
          height: 'auto!important',
          zIndex: 1003,
        }}
        heitht={tokens.space.xxl}
        width={tokens.space.relative.full}
      >
        <NavHeader />
      </View>
      <View
        style={{
          position: 'fixed',
          top: tokens.space.xxl,

          height: 'auto!important',
          zIndex: 1003,
        }}
      >
        <Drawer />
      </View>
      <Flex
        direction="row"
        alignItems="stretch"
        gap="0"
        minHeight="calc(100vh - var(--amplify-space-xxl))"
      >
        <Flex
          flex="1 1 auto"
          direction="column"
          gap="0"
          style={{
            paddingLeft: tokens.space.xxl.value,
            paddingRight: tokens.space.xxl.value,
            backgroundColor: tokens.colors.background.tertiary.value,
            // overflowY: 'visible',
          }}
        >
          {children}
        </Flex>
      </Flex>
      <View
        style={{
          position: 'fixed',
          zIndex: 1002,
          bottom: 0,
        }}
        width={tokens.space.relative.full}
        height={tokens.space.xl}
      >
        <Footer />
      </View>
    </View>
  )
}

export default Layout
