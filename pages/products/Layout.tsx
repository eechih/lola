import { Flex, useTheme, View } from '@aws-amplify/ui-react'

import Drawer from './Drawer'
import NavHeader from './NavHeader'

interface LayoutProps {
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

function Layout({ children, maxWidth = 'lg' }: LayoutProps) {
  const { tokens } = useTheme()
  return (
    <View
      height="100%"
      style={{
        backgroundColor: tokens.colors.background.primary.value,
      }}
    >
      <View>
        <NavHeader />
      </View>
      <View height="100%">
        <Flex direction="row" alignItems="stretch" gap="0" height="100%">
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
      </View>
      <View></View>
    </View>
  )
}

export default Layout
