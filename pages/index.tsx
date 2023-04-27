import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React from 'react'

import Echo from '@/src/components/Echo'
import FederatedSignIn from '@/src/components/FederatedSignIn'
import Layout from '@/src/components/Layout'
import SpeakTranslatedImage from '@/src/components/SpeakTranslatedImage'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function Home() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Layout>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="SpeakTranslatedImage" />
        <Tab label="Echo" />
        <Tab label="FederatedSignIn" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SpeakTranslatedImage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Echo />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FederatedSignIn />
      </TabPanel>
    </Layout>
  )
}
