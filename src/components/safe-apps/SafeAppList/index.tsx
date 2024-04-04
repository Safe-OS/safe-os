import type { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk'

import SafeAppCard from '@/components/safe-apps/SafeAppCard'
import AddCustomSafeAppCard from '@/components/safe-apps/AddCustomSafeAppCard'
import SafeAppsListHeader from '@/components/safe-apps/SafeAppsListHeader'
import SafeAppsZeroResultsPlaceholder from '@/components/safe-apps/SafeAppsZeroResultsPlaceholder'
import css from './styles.module.css'
import { Skeleton } from '@mui/material'
import { useOpenedSafeApps } from '@/hooks/safe-apps/useOpenedSafeApps'

type SafeAppListProps = {
  safeAppsList: SafeAppData[]
  safeAppsListLoading?: boolean
  bookmarkedSafeAppsId?: Set<number>
  onBookmarkSafeApp?: (safeAppId: number) => void
  addCustomApp?: (safeApp: SafeAppData) => void
  removeCustomApp?: (safeApp: SafeAppData) => void
  title: string
  query?: string
}

const SafeAppList = ({
  safeAppsList,
  safeAppsListLoading,
  bookmarkedSafeAppsId,
  onBookmarkSafeApp,
  addCustomApp,
  removeCustomApp,
  title,
  query,
  modal
}: SafeAppListProps & { modal?: boolean }) => {
  const { openedSafeAppIds } = useOpenedSafeApps()

  const showZeroResultsPlaceholder = query && safeAppsList.length === 0

  const navigateToSafeApp = (safeAppUrl: string, router: any) => {
    router.push(safeAppUrl)
  }

  return (
    <>
      {/* Safe Apps List Header */}
      <SafeAppsListHeader title={title} amount={safeAppsList.length} />

      {/* Safe Apps List */}
      <ul data-testid="apps-list" className={css.safeAppsContainer}>
        {/* Add Custom Safe App Card */}
        {addCustomApp && (
          <li>
            <AddCustomSafeAppCard safeAppList={safeAppsList} onSave={addCustomApp} />
          </li>
        )}

        {safeAppsListLoading &&
          Array.from({ length: 8 }, (_, index) => (
            <li key={index}>
              <Skeleton variant="rounded" height="271px" />
            </li>
          ))}

        {/* Flat list filtered by search query */}
        {safeAppsList.map((safeApp) => (
          <li key={safeApp.id}>
            <SafeAppCard
              modal={modal}
              safeApp={safeApp}
              isBookmarked={bookmarkedSafeAppsId?.has(safeApp.id)}
              onBookmarkSafeApp={onBookmarkSafeApp}
              removeCustomApp={removeCustomApp}
              onClickSafeApp={navigateToSafeApp}
            />
          </li>
        ))}
      </ul>

      {/* Zero results placeholder */}
      {showZeroResultsPlaceholder && <SafeAppsZeroResultsPlaceholder searchQuery={query} />}

    </>
  )
}

export default SafeAppList
