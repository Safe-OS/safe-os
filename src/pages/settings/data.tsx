import DataManagement from '@/components/settings/DataManagement'
import type { NextPage } from 'next'
import Head from 'next/head'

const Data: NextPage = () => {
  return (
    <>
      <Head>
        <title>{'SafeOS – Settings – Data'}</title>
      </Head>

      <main>
        <DataManagement />
      </main>
    </>
  )
}

export default Data
