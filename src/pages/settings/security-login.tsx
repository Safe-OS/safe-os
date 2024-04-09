import type { NextPage } from 'next'
import Head from 'next/head'

import SettingsHeader from '@/components/settings/SettingsHeader'
import SecurityLogin from '@/components/settings/SecurityLogin'

const SecurityLoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'SafeOS – Settings – Security & Login'}</title>
      </Head>

      <main>
        <SecurityLogin />
      </main>
    </>
  )
}

export default SecurityLoginPage
