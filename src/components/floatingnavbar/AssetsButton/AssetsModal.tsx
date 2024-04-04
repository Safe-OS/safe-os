import { type ReactElement } from 'react'
import { DialogContent } from '@mui/material'
import ModalDialog from '@/components/common/ModalDialog'

import AssetsTable from '@/components/balances/AssetsTable'
import AssetsHeader from '@/components/balances/AssetsHeader'
import useBalances from '@/hooks/useBalances'
import { useState } from 'react'

import PagePlaceholder from '@/components/common/PagePlaceholder'
import NoAssetsIcon from '@/public/images/balances/no-assets.svg'
import HiddenTokenButton from '@/components/balances/HiddenTokenButton'
import CurrencySelect from '@/components/balances/CurrencySelect'
import TokenListSelect from '@/components/balances/TokenListSelect'

const AssetsModal = ({ onClose }: { onClose: () => void }): ReactElement => {
  const { error } = useBalances()
  const [showHiddenAssets, setShowHiddenAssets] = useState(false)
  const toggleShowHiddenAssets = () => setShowHiddenAssets((prev) => !prev)
  
    return (
    <ModalDialog open dialogTitle="Assets" onClose={onClose}>
      <DialogContent>
      <AssetsHeader>
        <HiddenTokenButton showHiddenAssets={showHiddenAssets} toggleShowHiddenAssets={toggleShowHiddenAssets} />
        <TokenListSelect />
        <CurrencySelect />
      </AssetsHeader>

      <main>
        {error ? (
          <PagePlaceholder img={<NoAssetsIcon />} text="There was an error loading your assets" />
        ) : (
          <AssetsTable setShowHiddenAssets={setShowHiddenAssets} showHiddenAssets={showHiddenAssets} />
        )}
      </main>
      </DialogContent>
    </ModalDialog>
  )
}

export default AssetsModal
