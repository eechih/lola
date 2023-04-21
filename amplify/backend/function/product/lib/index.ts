import { DynamoDBStreamEvent } from 'aws-lambda'

export const handler = async (event: DynamoDBStreamEvent) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  for (const record of event.Records) {
    console.log('eventID: %s', record.eventID)
    console.log('eventName: %s', record.eventName)
    console.log('DynamoDB Record: %j', record.dynamodb)
  }
  return 'Successfully processed DynamoDB record'
}
