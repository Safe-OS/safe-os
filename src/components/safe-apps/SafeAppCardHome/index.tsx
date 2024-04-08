import Link from 'next/link'
import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { resolveHref } from 'next/dist/client/resolve-href'
import classNames from 'classnames'
import type { useState, ReactNode, SyntheticEvent } from 'react'
import type { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk'
import type { NextRouter } from 'next/router'

import ViewAppModal from '@/components/modals/ViewAppModal'
import type { UrlObject } from 'url'
import SafeAppIconCard from '@/components/safe-apps/SafeAppIconCard'
import { isOptimizedForBatchTransactions } from '@/components/safe-apps/utils'
import { AppRoutes } from '@/config/routes'
import BatchIcon from '@/public/images/apps/batch-icon.svg'
import css from './styles.module.css'

type SafeAppCardProps = {
  safeApp: SafeAppData
  onClickSafeApp?: () => void
  isBookmarked?: boolean
  onBookmarkSafeApp?: (safeAppId: number) => void
  removeCustomApp?: (safeApp: SafeAppData) => void
  openPreviewDrawer?: (safeApp: SafeAppData) => void
}

const SafeAppCardHome = ({
  safeApp,
  onClickSafeApp,
  isBookmarked,
  onBookmarkSafeApp,
  removeCustomApp,
  openPreviewDrawer,
}: SafeAppCardProps) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSafeAppUrl, setSelectedSafeAppUrl] = useState('')

  const safeAppUrl = getSafeAppUrl(router, safeApp.url)

  const handleCardClick = () => {
    setSelectedSafeAppUrl(safeApp.url)
    setIsModalOpen(true)
  }

  return (
    <>
    <SafeAppCardGridView
      safeApp={safeApp}
      safeAppUrl={safeAppUrl}
      isBookmarked={isBookmarked}
      onBookmarkSafeApp={onBookmarkSafeApp}
      removeCustomApp={removeCustomApp}
      onClickSafeApp={handleCardClick}
      openPreviewDrawer={openPreviewDrawer}
    />
          <ViewAppModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        url={selectedSafeAppUrl} // The URL to open in the modal
      />
    </>
  )
}

export default SafeAppCardHome

export const getSafeAppUrl = (router: NextRouter, safeAppUrl: string) => {
  const shareUrlObj: UrlObject = {
    pathname: AppRoutes.apps.open,
    query: { safe: router.query.safe, appUrl: safeAppUrl },
  }

  return resolveHref(router, shareUrlObj)
}

type SafeAppCardViewProps = {
  safeApp: SafeAppData
  onClickSafeApp?: () => void
  safeAppUrl: string
  isBookmarked?: boolean
  onBookmarkSafeApp?: (safeAppId: number) => void
  removeCustomApp?: (safeApp: SafeAppData) => void
  openPreviewDrawer?: (safeApp: SafeAppData) => void
}

const SafeAppCardGridView = ({ safeApp, onClickSafeApp, safeAppUrl }: SafeAppCardViewProps) => {
  return (
    <SafeAppCardContainer safeAppUrl={safeAppUrl} onClickSafeApp={onClickSafeApp} height={'100%'}>
      {/* Safe App Header */}
      <CardHeader
        className={css.safeAppHeader}
        avatar={
          <div className={css.safeAppIconContainer}>
            {/* Batch transactions Icon */}
            {isOptimizedForBatchTransactions(safeApp) && (
              <BatchIcon className={css.safeAppBatchIcon} alt="batch transactions icon" />
            )}

            {/* Safe App Icon */}
            <SafeAppIconCard src={safeApp.iconUrl} alt={`${safeApp.name} logo`} />
          </div>
        }
      />

      <CardContent className={css.safeAppContent}>
        {/* Safe App Title */}
        <Typography className={css.safeAppTitle} gutterBottom variant="h5">
          {safeApp.name}
        </Typography>
      </CardContent>
    </SafeAppCardContainer>
  )
}

type SafeAppCardContainerProps = {
  onClickSafeApp?: () => void
  safeAppUrl: string
  children: ReactNode
  height?: string
  className?: string
}

export const SafeAppCardContainer = ({
  children,
  safeAppUrl,
  onClickSafeApp,
  height,
  className,
}: SafeAppCardContainerProps) => {
const handleSafeAppClick = (safeAppUrl: string) => {
  setSelectedSafeAppUrl(safeAppUrl)
  setIsModalOpen(true)
}
  }

  return (
      <Card onClick={onClickSafeApp} className={classNames(css.safeAppContainer, className)} sx={{ height }}>
        {children}
      </Card>
  )
}
