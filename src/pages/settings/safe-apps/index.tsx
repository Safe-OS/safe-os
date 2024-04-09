import type { NextPage } from 'next'
import Head from 'next/head'

import SafeAppsPermissions from '@/components/settings/SafeAppsPermissions'
import { SafeAppsSigningMethod } from '@/components/settings/SafeAppsSigningMethod'

const SafeAppsPermissionsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'SafeOS – Settings – Safe Apps'}</title>
      </Head>

      <main>
        <SafeAppsPermissions />
        <SafeAppsSigningMethod />
      </main>
    </>
  )
}

export default SafeAppsPermissionsPage
