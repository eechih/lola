import { Flex, Link, Text, useTheme } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'
import { BsChevronRight } from 'react-icons/bs'

type Breadcrumb = {
  label: string
  href?: string
}

export default function Breadcrumbs(props: { breadcrumbs: Breadcrumb[] }) {
  const router = useRouter()
  const { tokens } = useTheme()
  return (
    <Flex
      style={{
        paddingTop: tokens.space.large.value,
        paddingBottom: tokens.space.medium.value,
      }}
    >
      {props.breadcrumbs.map((breadcrumb, index, array) => {
        const { label, href } = breadcrumb
        const isLastElement = index + 1 == array.length
        return (
          <Flex alignItems="center" key={index}>
            {(href && (
              <Link onClick={() => router.push(href ?? '')}>{label}</Link>
            )) || (
              <Text
                style={{
                  fontWeight: tokens.fontWeights.bold.value,
                  color: tokens.colors.font.tertiary.value,
                }}
              >
                {label}
              </Text>
            )}
            {!isLastElement && <BsChevronRight />}
          </Flex>
        )
      })}
    </Flex>
  )
}
