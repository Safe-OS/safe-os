import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import debounce from 'lodash/debounce'

import { useSafeApps } from '@/hooks/safe-apps/useSafeApps'
import SafeAppList from '@/components/safe-apps/SafeAppList'
import { AppRoutes } from '@/config/routes'
import useSafeAppsFilters from '@/hooks/safe-apps/useSafeAppsFilters'
import SafeAppsFilters from '@/components/safe-apps/SafeAppsFilters'
import { useHasFeature } from '@/hooks/useChains'
import { FEATURES } from '@/utils/chains'

import ModalDialog from '@/components/common/ModalDialog'
import {
  Tab,
  Tabs,
  Box,
  Typography,
  DialogContent
} from '@mui/material'
import BookmarkedSafeApps from '@/pages/apps/bookmarked'
import CustomSafeApps from '@/pages/apps/custom'
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

const AppsModal: React.FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const [tab, setTab] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const router = useRouter()
  const { remoteSafeApps, remoteSafeAppsLoading, pinnedSafeApps, pinnedSafeAppIds, togglePin } = useSafeApps()
  const { filteredApps, query, setQuery, setSelectedCategories, setOptimizedWithBatchFilter, selectedCategories } =
    useSafeAppsFilters(remoteSafeApps)
  const isFiltered = filteredApps.length !== remoteSafeApps.length
  const isSafeAppsEnabled = useHasFeature(FEATURES.SAFE_APPS)

  const nonPinnedApps = useMemo(
    () => remoteSafeApps.filter((app) => !pinnedSafeAppIds.has(app.id)),
    [remoteSafeApps, pinnedSafeAppIds],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeQuery = useCallback(debounce(setQuery, 300), [])

  // Redirect to an individual safe app page if the appUrl is in the query params
  useEffect(() => {
    const appUrl = router.query.appUrl as string
    if (appUrl) {
      router.push({ pathname: AppRoutes.apps.open, query: { safe: router.query.safe, appUrl } })
    }
  }, [router])

  if (!isSafeAppsEnabled) return <></>

  return (
    <ModalDialog open={open} dialogTitle="View Apps" onClose={onClose} maxWidth="md">
      <DialogContent sx={{ maxHeight: '90vh', overflow: 'auto' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="folder tabs" variant="scrollable" scrollButtons="auto">
          <Tab label="All Apps" />
          <Tab label="Bookmarked Apps" />
          <Tab label="My Custom Apps" />
        </Tabs>
        <TabPanel value={tab} index={0}>
        {/* Safe Apps Filters */}
        <SafeAppsFilters
          onChangeQuery={onChangeQuery}
          onChangeFilterCategory={setSelectedCategories}
          onChangeOptimizedWithBatch={setOptimizedWithBatchFilter}
          selectedCategories={selectedCategories}
          safeAppsList={remoteSafeApps}
        />

        {/* Pinned apps */}
        {!isFiltered && pinnedSafeApps.length > 0 && (
          <SafeAppList
            title="My pinned apps"
            safeAppsList={pinnedSafeApps}
            bookmarkedSafeAppsId={pinnedSafeAppIds}
            onBookmarkSafeApp={togglePin}
          />
        )}

        {/* All apps */}
        <SafeAppList
          title="All apps"
          safeAppsList={isFiltered ? filteredApps : nonPinnedApps}
          safeAppsListLoading={remoteSafeAppsLoading}
          bookmarkedSafeAppsId={pinnedSafeAppIds}
          onBookmarkSafeApp={togglePin}
          query={query}
        />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <BookmarkedSafeApps />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <CustomSafeApps />
        </TabPanel>
      </DialogContent>
    </ModalDialog>
  )
}

export default AppsModal
