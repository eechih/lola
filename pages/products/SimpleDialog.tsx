import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export interface SimpleDialogProps {
  open: boolean
  title?: string
  children?: React.ReactNode
  contentText?: string
  disableEscapeKeyDown?: boolean
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const {
    title,
    children,
    contentText,
    open,
    disableEscapeKeyDown = false,
  } = props

  return (
    <Dialog open={open} disableEscapeKeyDown={disableEscapeKeyDown}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {children && <DialogContent>{children}</DialogContent>}
      {!children && contentText && (
        <DialogContent>
          {contentText && <DialogContentText>{contentText}</DialogContentText>}
        </DialogContent>
      )}
    </Dialog>
  )
}
