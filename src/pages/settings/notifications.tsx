import Head from 'next/head'
import type { NextPage } from 'next'

import { PushNotifications } from '@/components/settings/PushNotifications'
import { useHasFeature } from '@/hooks/useChains'
import { FEATURES } from '@/utils/chains'

const NotificationsPage: NextPage = () => {
  const isNotificationFeatureEnabled = useHasFeature(FEATURES.PUSH_NOTIFICATIONS)

  if (!isNotificationFeatureEnabled) {
    return null
  }

  return (
    <>
      <Head>
        <title>{'SafeOS – Settings – Notifications'}</title>
      </Head>

      <main>
        <PushNotifications />
      </main>
    </>
  )
}

export default NotificationsPage
