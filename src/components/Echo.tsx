import { GRAPHQL_AUTH_MODE, GraphQLQuery } from '@aws-amplify/api'
import { Button, Flex, Heading, Text, TextField } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'
import { useState } from 'react'

import { EchoQuery, EchoQueryVariables } from '../API'
import * as queries from '../graphql/queries'

export default function SpeakTranslatedImage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  async function echo() {
    const variables: EchoQueryVariables = {
      msg: input,
    }
    const res = await API.graphql<GraphQLQuery<EchoQuery>>({
      query: queries.echo,
      variables: variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })
    setOutput(res.data?.echo ?? '')
  }

  return (
    <Flex direction="column" alignItems="center" maxWidth="32rem" width="100%">
      <Heading level={2}>Echo Message</Heading>
      <Flex direction="row" alignItems="center">
        <TextField
          label="Echo message"
          labelHidden={true}
          placeholder="Please input a message to echo."
          onChange={event => setInput(event.target.value)}
        />
        <Button onClick={echo}>Echo</Button>
        <Text variation="info" fontWeight={600}>
          {output}
        </Text>
      </Flex>
    </Flex>
  )
}
