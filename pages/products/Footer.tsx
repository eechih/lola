import { Flex, useTheme } from '@aws-amplify/ui-react'

function Footer() {
  const { tokens } = useTheme()

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      style={{ backgroundColor: tokens.colors.background.quaternary.value }}
      height="auto"
    >
      Footer 2
    </Flex>
  )
}

export default Footer
