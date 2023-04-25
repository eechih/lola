import { Flex, useTheme, View } from '@aws-amplify/ui-react'

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
      height="100vh"
      paddingTop="40px"
      paddingBottom="55px"
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
        heitht="40px"
        width="100%"
      >
        <NavHeader />
      </View>
      <Flex
        direction="row"
        alignItems="stretch"
        gap="0"
        height="calc(100vh - 40px)"
      >
        <Drawer />
        <Flex
          flex="1 1 auto"
          direction="column"
          gap="0"
          style={{
            paddingLeft: tokens.space.xxl.value,
            paddingRight: tokens.space.xxl.value,
            backgroundColor: tokens.colors.background.tertiary.value,
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
        width="100%"
        height="55px"
      >
        <Footer />
      </View>
    </View>
  )
}

export default Layout
