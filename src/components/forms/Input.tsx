import TextField, { TextFieldProps } from '@mui/material/TextField'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

type InputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<TextFieldProps, 'name' | 'defaultValue'>

export default function Input<TFieldValues extends FieldValues>(
  props: InputProps<TFieldValues>
) {
  const { error: defaultError, helperText: defaultHelperText } = props
  const { field, fieldState } = useController(props)
  return (
    <TextField
      {...props}
      id={field.name}
      error={fieldState.invalid ?? defaultError}
      helperText={fieldState.error?.message ?? defaultHelperText}
      {...field}
    />
  )
}
