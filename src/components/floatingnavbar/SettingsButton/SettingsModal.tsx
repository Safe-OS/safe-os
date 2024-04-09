import ModalDialog from '@/components/common/ModalDialog'
import React, { useState } from 'react'
import Appearance from '@/pages/settings/appearance'
import Setup from '@/pages/settings/setup'
import SecurityLoginPage from '@/pages/settings/security-login'
import NotificationsPage from '@/pages/settings/notifications'
import Modules from '@/pages/settings/modules'
import SafeAppsPermissionsPage from '@/pages/settings/safe-apps'
import Data from '@/pages/settings/data'
import EnvironmentVariablesPage from '@/pages/settings/environment-variables'
import {
  DialogContent,
  Tab,
  Tabs,
  Box,
  Typography
} from '@mui/material'

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
      {value === index && (
        <Box sx={{ p: 1.5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}


const SettingsModal: React.FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const [tab, setTab] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <ModalDialog open={open} dialogTitle="Settings" onClose={onClose} maxWidth="md">
      <DialogContent sx={{ maxHeight: '90vh', overflow: 'auto' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="folder tabs" variant="scrollable" scrollButtons="auto">
          <Tab label="Setup" />
          <Tab label="Appearance" />
          <Tab label="Security & Login" />
          <Tab label="Notifications" />
          <Tab label="Modules" />
          <Tab label="Safe Apps" />
          <Tab label="Data" />
          <Tab label="Environment variables" />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <Setup />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Appearance />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <SecurityLoginPage />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <NotificationsPage />
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <Modules />
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <SafeAppsPermissionsPage />
        </TabPanel>
        <TabPanel value={tab} index={6}>
          <Data />
        </TabPanel>
        <TabPanel value={tab} index={7}>
          <EnvironmentVariablesPage />
        </TabPanel>
      </DialogContent>
    </ModalDialog>
  )
}

export default SettingsModal
