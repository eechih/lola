import {
  Collection,
  Divider,
  Flex,
  Heading,
  Link,
  ToggleButton,
  useTheme,
} from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdClear, MdMenu } from 'react-icons/md'
import styled from 'styled-components'

const DrawerClosed = styled(Flex)`
  padding-top: var(--amplify-space-medium);
  border-radius: var(--amplify-space-zero);
  cursor: pointer;
  &:hover {
    color: var(--amplify-colors-neutral-100);
    background-color: var(--amplify-colors-neutral-40);
  }
`
export default function Drawer() {
  const router = useRouter()
  const pathname = router.pathname as string
  const { tokens } = useTheme()
  const [open, setOpen] = useState(true)

  if (open) {
    return (
      <Flex
        direction="column"
        style={{
          width: 280,
          position: 'relative',
          borderRight: '2px solid var(--amplify-colors-border-secondary)',
        }}
        gap="0"
      >
        <ToggleButton
          variation="menu"
          onClick={() => setOpen(false)}
          style={{ position: 'absolute', top: 16, right: 4 }}
        >
          <MdClear size={20} />
        </ToggleButton>
        <Heading
          level={6}
          style={{
            padding: tokens.space.large.value,
          }}
        >
          產品管理
        </Heading>
        <Divider />
        <Collection
          items={[
            {
              title: '儀表板',
              href: '/',
            },
            {
              title: '產品列表',
              href: '/products',
            },
            {
              title: '設定',
              href: '/products/setting',
            },
          ]}
          type="list"
          direction="column"
          style={{
            padding: tokens.space.large.value,
          }}
        >
          {(item, index) => {
            const interactive = pathname == item.href
            return (
              <Flex key={index}>
                <Link
                  color={
                    interactive
                      ? tokens.colors.font.interactive.value
                      : tokens.colors.font.tertiary.value
                  }
                  fontWeight={interactive ? 900 : 400}
                  onClick={() => router.push(item.href)}
                >
                  {item.title}
                </Link>
              </Flex>
            )
          }}
        </Collection>
      </Flex>
    )
  } else {
    return (
      <DrawerClosed
        direction="column"
        alignItems="center"
        style={{
          width: 48,
          borderRight: '2px solid var(--amplify-colors-border-secondary)',
        }}
        gap="0"
        onClick={() => setOpen(true)}
      >
        <MdMenu size={24} />
      </DrawerClosed>
    )
  }
}
