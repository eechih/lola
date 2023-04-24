import axios from 'axios'

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export async function handler(event) {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  for (const record of event.Records) {
    console.log(record.eventID)
    console.log(record.eventName)
    console.log('DynamoDB Record: %j', record.dynamodb)
  }

  const res = await axios({
    url: 'https://www.google.com',
    method: 'get',
  })
  console.log('res', res)
  console.log('res.data', res.data)
  return Promise.resolve('Successfully processed DynamoDB record')
}
