import MenuItem from '@mui/material/MenuItem'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

type SelectOption = {
  label: string
  value: string
}

type SelectProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<TextFieldProps, 'type' | 'name' | 'defaultValue'> & {
      options: SelectOption[]
    }

export default function Select<TFieldValues extends FieldValues>(
  props: SelectProps<TFieldValues>
) {
  const {
    options,
    error: defaultError,
    helperText: defaultHelperText,
    ...rest
  } = props
  const { field, fieldState } = useController(rest)
  return (
    <TextField
      {...rest}
      select
      id={field.name}
      error={fieldState.invalid ?? defaultError}
      helperText={fieldState.error?.message ?? defaultHelperText}
      {...field}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}
