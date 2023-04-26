import { Flex, Text, useTheme } from '@aws-amplify/ui-react'

function Footer() {
  const { tokens } = useTheme()

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      style={{
        backgroundColor: tokens.colors.brand.primary[80].value,
        borderTop: '2px solid var(--amplify-colors-border-secondary)',
      }}
      height="100%"
      paddingRight={20}
      paddingLeft={20}
    >
      <Flex direction="row" alignItems="center">
        <Text color={tokens.colors.font.inverse.value} fontSize="10pt">
          意見回饋
        </Text>
      </Flex>

      <Flex direction="row" alignItems="center">
        <Text color={tokens.colors.font.inverse.value} fontSize="10pt">
          Copyright © 2023
        </Text>
        <Text color={tokens.colors.font.inverse.value} fontSize="10pt">
          隱私權
        </Text>
        <Text color={tokens.colors.font.inverse.value} fontSize="10pt">
          條款
        </Text>
      </Flex>
    </Flex>
  )
}

export default Footer
