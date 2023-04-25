import {
  Button,
  Flex,
  Heading,
  useTheme,
  withAuthenticator,
  WithAuthenticatorProps,
} from '@aws-amplify/ui-react'

function Navigation({ signOut, user }: WithAuthenticatorProps) {
  const { tokens } = useTheme()
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      style={{ backgroundColor: tokens.colors.background.quaternary.value }}
    >
      <Heading level={3}>產品管理</Heading>
      <Flex alignItems="center">
        <Heading level={6}>{user?.username}</Heading>
        <Button variation="link" size="small" onClick={signOut}>
          登出
        </Button>
      </Flex>
    </Flex>
  )
}

export default withAuthenticator(Navigation)
