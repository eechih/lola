import { useTheme, View } from '@aws-amplify/ui-react'

interface PaperProps {
  children: React.ReactNode
  variant?: 'elevation' | 'outlined'
  elevation?: number
  squre?: boolean
}

function Paper({
  children,
  variant = 'elevation',
  elevation = 1,
  squre = false,
}: PaperProps) {
  const { tokens } = useTheme()
  if (variant == 'outlined')
    return (
      <View
        as="div"
        border="1px solid rgba(0, 0, 0, 0.12)"
        style={{ backgroundColor: tokens.colors.background.secondary.value }}
      >
        {children}
      </View>
    )
  else
    return (
      <View
        as="div"
        boxShadow="0px 2px 1px -1px var(--amplify-colors-shadow-tertiary), 0px 1px 1px 0px var(--amplify-colors-shadow-primary), 0px 1px 3px 0px var(--amplify-colors-shadow-secondary)"
        style={{ backgroundColor: tokens.colors.background.secondary.value }}
      >
        {children}
      </View>
    )
}

export default Paper
