import { SSM } from 'aws-sdk'

const ssm = new SSM()

export const getSecretValues = async (
  secretNames: string[]
): Promise<string[]> => {
  const { Parameters } = await ssm
    .getParameters({
      Names: secretNames.map(secretName => process.env[secretName] ?? ''),
      WithDecryption: true,
    })
    .promise()

  const secretValues = secretNames.map(
    secretName =>
      Parameters?.find(parameter => parameter.Name?.endsWith(secretName))
        ?.Value ?? ''
  )
  return secretValues
}
