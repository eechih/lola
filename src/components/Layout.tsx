import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import TableViewIcon from '@mui/icons-material/TableView'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import NextLink from 'next/link'
import { useState } from 'react'

import NavHeader from './NavHeader'

const drawerWidth = 240
const minDrawerWidth = 56

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true)

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <NavHeader />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : minDrawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : minDrawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpen(!open)}>
                {open && <ListItemText primary="產品管理" />}
                {open ? <CloseIcon /> : <MenuIcon />}
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key="home" disablePadding>
              <ListItemButton LinkComponent={NextLink} href="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                {open && <ListItemText primary="首頁" />}
              </ListItemButton>
            </ListItem>
            <ListItem key="products" disablePadding>
              <ListItemButton LinkComponent={NextLink} href="/products">
                <ListItemIcon>
                  <TableViewIcon />
                </ListItemIcon>
                {open && <ListItemText primary="產品列表" />}
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton LinkComponent={NextLink} href="/products">
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
