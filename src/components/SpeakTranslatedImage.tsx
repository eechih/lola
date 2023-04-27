import { GRAPHQL_AUTH_MODE, GraphQLQuery } from '@aws-amplify/api'
import { Flex, Heading, Image } from '@aws-amplify/ui-react'
import { API, Storage } from 'aws-amplify'
import { ChangeEvent, useState } from 'react'

import {
  SpeakTranslatedImageTextQuery,
  SpeakTranslatedImageTextQueryVariables,
} from '@/src/API'
import * as queries from '@/src/graphql/queries'

export default function SpeakTranslatedImage() {
  const [src, setSrc] = useState('')
  const [img, setImg] = useState('')

  function putS3Image(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files)
    const file = event.target.files?.[0]
    if (file) {
      Storage.put(file.name, file)
        .then(async res => {
          setImg(await Storage.get(res.key))
          setSrc(await speakTranslatedImageTextOP(res.key))
        })
        .catch(err => console.log(err))
    }
  }

  async function speakTranslatedImageTextOP(key: string): Promise<string> {
    const variables: SpeakTranslatedImageTextQueryVariables = {
      input: {
        translateText: {
          sourceLanguage: 'en',
          targetLanguage: 'zh',
        },
        identifyText: { key },
        convertTextToSpeech: { voiceID: 'Zhiyu' },
      },
    }
    const res = await API.graphql<GraphQLQuery<SpeakTranslatedImageTextQuery>>({
      query: queries.speakTranslatedImageText,
      variables: variables,
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })
    return res.data?.speakTranslatedImageText ?? ''
  }

  return (
    <Flex direction="column" alignItems="center" maxWidth="32rem" width="100%">
      <Heading level={2}>Speak Translated Image</Heading>
      <Flex direction="row" alignItems="center">
        <Heading level={6}>Upload Image</Heading>
        <input
          type="file"
          accept="image/jpeg"
          onChange={event => putS3Image(event)}
        />
      </Flex>
      {img && <Image src={img} alt={img} width="100%" />}
      {src && (
        <div>
          <audio id="audioPlayback" controls>
            <source id="audioSource" type="audio/mp3" src={src} />
          </audio>
        </div>
      )}
    </Flex>
  )
}
