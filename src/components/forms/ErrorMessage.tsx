import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { GlobalError } from 'react-hook-form'

export default function ErrorMessage(props: {
  error: GlobalError | GlobalError[] | Record<string, GlobalError>
}) {
  const { error } = props

  const isGlobalError = (error: any): boolean => {
    return (
      'type' in error && 'message' in error && typeof error.message === 'string'
    )
  }

  let errors: GlobalError[]
  if (isGlobalError(error)) {
    errors = [error as GlobalError]
  } else if (Array.isArray(error)) {
    errors = error
  } else {
    const _errors = error as Record<string, GlobalError>
    errors = Object.keys(_errors).map(key => _errors[key])
  }

  return (
    <Stack spacing={1}>
      {errors.map((error, index) => (
        <Alert severity="error" key={index}>
          {error.type} - {error.message}
        </Alert>
      ))}
    </Stack>
  )
}
