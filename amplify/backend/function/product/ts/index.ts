import { AmplifyGraphQlResolverEvent, DynamoDBStreamEvent } from 'aws-lambda'
import axios from 'axios'

type Event = DynamoDBStreamEvent | AmplifyGraphQlResolverEvent

export const handler = async (event: Event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  if (isDynamoDBStreamEvent(event)) {
    return handleDynamoDBStreamEvent(event as DynamoDBStreamEvent)
  } else if (isAmplifyGraphQlResolverEvent(event)) {
    return handleAmplifyGraphQlResolverEvent(
      event as AmplifyGraphQlResolverEvent
    )
  }
}

function isDynamoDBStreamEvent(event: Event) {
  return 'Records' in event
}

async function handleDynamoDBStreamEvent(event: DynamoDBStreamEvent) {
  for (const record of event.Records) {
    console.log('eventID: %s', record.eventID)
    console.log('eventName: %s', record.eventName)
    console.log('DynamoDB Record: %j', record.dynamodb)

    const res = await axios({ url: 'https://www.google.com' })
    console.log('res', res.data)
  }
  return 'Successfully processed DynamoDB record'
}

function isAmplifyGraphQlResolverEvent(event: Event) {
  return (
    'typeName' in event &&
    'fieldName' in event &&
    'arguments' in event &&
    'request' in event
  )
}

async function handleAmplifyGraphQlResolverEvent(
  event: AmplifyGraphQlResolverEvent
) {
  const { typeName, fieldName } = event
  if (typeName === 'Query' && fieldName === 'publishProduct') {
    console.log('publishProduct...')
    const res = await axios({ url: 'https://www.google.com' })
    console.log('res', res.data)
    return
  }
}
