import {
  WithAuthenticatorProps,
  withAuthenticator,
} from '@aws-amplify/ui-react'

import AccountCircle from '@mui/icons-material/AccountCircle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { useState } from 'react'

function NavHeader({ signOut, user }: WithAuthenticatorProps) {
  // const { tokens } = useTheme()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [auth, setAuth] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Photos
      </Typography>
      {user && (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>{user.username}</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>設定</MenuItem>
            <MenuItem onClick={handleClose}>帳號</MenuItem>
            <Divider />
            <MenuItem onClick={signOut}>登出</MenuItem>
          </Menu>
        </div>
      )}
    </Toolbar>
  )
}

export default withAuthenticator(NavHeader)
