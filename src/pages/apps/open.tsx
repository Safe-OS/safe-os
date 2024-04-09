import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Box, CircularProgress } from '@mui/material'

import { useSafeAppUrl } from '@/hooks/safe-apps/useSafeAppUrl'
import { useSafeApps } from '@/hooks/safe-apps/useSafeApps'
import SafeAppsInfoModal from '@/components/safe-apps/SafeAppsInfoModal'
import useSafeAppsInfoModal from '@/components/safe-apps/SafeAppsInfoModal/useSafeAppsInfoModal'
import SafeAppsErrorBoundary from '@/components/safe-apps/SafeAppsErrorBoundary'
import SafeAppsLoadError from '@/components/safe-apps/SafeAppsErrorBoundary/SafeAppsLoadError'
import AppFrame from '@/components/safe-apps/AppFrame'
import { useSafeAppFromManifest } from '@/hooks/safe-apps/useSafeAppFromManifest'
import { useBrowserPermissions } from '@/hooks/safe-apps/permissions'
import useChainId from '@/hooks/useChainId'
import { AppRoutes } from '@/config/routes'
import { getOrigin } from '@/components/safe-apps/utils'
import { useHasFeature } from '@/hooks/useChains'
import { FEATURES } from '@/utils/chains'
import { openWalletConnect } from '@/features/walletconnect/components'
import { isWalletConnectSafeApp } from '@/utils/gateway'

interface Props {
  safeAppUrl?: string
}

const SafeApps: NextPage<Props> = ({ safeAppUrl }) => {
  const chainId = useChainId()
  const router = useRouter()
  const appUrl = useSafeAppUrl()
  const { allSafeApps, remoteSafeAppsLoading } = useSafeApps()
  const safeAppData = allSafeApps.find((app) => app.url === appUrl)
  const activeUrl = safeAppUrl || appUrl
  const { safeApp, isLoading } = useSafeAppFromManifest(activeUrl || '', chainId, safeAppData)
  const isSafeAppsEnabled = useHasFeature(FEATURES.SAFE_APPS)
  const isWalletConnectEnabled = useHasFeature(FEATURES.NATIVE_WALLETCONNECT)

  const { addPermissions, getPermissions, getAllowedFeaturesList } = useBrowserPermissions()
  const origin = getOrigin(activeUrl)
  const {
    isModalVisible,
    isPermissionsReviewCompleted,
    onComplete,
  } = useSafeAppsInfoModal({
    url: origin,
    safeApp: safeAppData,
    permissions: safeApp?.safeAppsPermissions || [],
    addPermissions,
    getPermissions,
    remoteSafeAppsLoading,
  })

  const goToList = useCallback(() => {
    router.push({
      pathname: AppRoutes.apps.index,
      query: { safe: router.query.safe },
    })
  }, [router])

  // appUrl is required to be present
  if (!isSafeAppsEnabled || !activeUrl || !router.isReady) return null

  if (isWalletConnectEnabled && isWalletConnectSafeApp(activeUrl)) {
    openWalletConnect()
    goToList()
    return null
  }

  if (isModalVisible) {
    return (
      <SafeAppsInfoModal
        key={isLoading ? 'loading' : 'loaded'}
        onCancel={goToList}
        onConfirm={onComplete}
        features={safeApp.safeAppsPermissions}
        appUrl={safeApp.url}
        isPermissionsReviewCompleted={isPermissionsReviewCompleted}
      />
    )
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <SafeAppsErrorBoundary render={() => <SafeAppsLoadError onBackToApps={() => router.back()} />}>
      <AppFrame appUrl={activeUrl} allowedFeaturesList={getAllowedFeaturesList(origin)} safeAppFromManifest={safeApp} />
    </SafeAppsErrorBoundary>
  )
}

export default SafeApps
