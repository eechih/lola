import { CognitoHostedUIIdentityProvider, CognitoUser } from '@aws-amplify/auth'
import { Button, Flex, Heading, Text } from '@aws-amplify/ui-react'
import { Auth, Hub } from 'aws-amplify'
import { useEffect, useState } from 'react'

export default function FederatedSignIn() {
  const [user, setUser] = useState<CognitoUser | null>(null)
  const [customState, setCustomState] = useState(null)

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log(event, data)
      switch (event) {
        case 'signIn':
          setUser(data)
          break
        case 'signOut':
          setUser(null)
          break
        case 'customOAuthState':
          setCustomState(data)
      }
    })

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log('Not signed in'))
    return unsubscribe
  }, [])

  return (
    <Flex direction="column" alignItems="center" maxWidth="32rem" width="100%">
      <Heading level={2}>Social Login</Heading>
      <Flex direction="column" alignItems="center">
        <Button onClick={() => Auth.federatedSignIn()}>Open Hosted</Button>
        <Button
          onClick={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Facebook,
            })
          }
        >
          Open Facebook
        </Button>
        <Button
          onClick={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            })
          }
        >
          Open Google
        </Button>
        <Button
          onClick={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Amazon,
            })
          }
        >
          Open Amazon
        </Button>
        <Button
          onClick={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Apple,
            })
          }
        >
          Open Apple
        </Button>
        <Button onClick={() => Auth.signOut()}>Sign Out</Button>

        <Text variation="info" fontWeight={600}>
          {user && user.getUsername()}
        </Text>
      </Flex>
    </Flex>
  )
}
