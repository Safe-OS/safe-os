import { Box, Button, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { useState } from 'react'

import TxModal from '@/components/tx/TxModal'
import useSafeInfo from '@/services/useSafeInfo'

import { useSafeSDK } from '@/services/safe-core/safeCoreSDK'
import { createTx } from '@/services/tx/txSender'
import useAsync from '@/services/useAsync'

import NonceForm from '@/components/tx/steps/ReviewNewTx/NonceForm'
import useSafeTxGas from '@/services/useSafeTxGas'
import SignOrExecuteForm from '@/components/tx/SignOrExecuteForm'
import { TxStepperProps } from '@/components/tx/TxStepper/useTxStepper'
import { SafeTransaction } from '@gnosis.pm/safe-core-sdk-types'

interface ChangeThresholdData {
  threshold: number
}

const ChangeThresholdSteps: TxStepperProps['steps'] = [
  {
    label: 'Change Threshold',
    render: (data, onSubmit) => <ChangeThresholdStep data={data as ChangeThresholdData} onSubmit={onSubmit} />,
  },
]

export const ChangeThresholdDialog = () => {
  const [open, setOpen] = useState(false)

  const { safe } = useSafeInfo()

  const handleClose = () => setOpen(false)

  const initialModalData: ChangeThresholdData = { threshold: safe?.threshold || 1 }

  return (
    <Box paddingTop={2}>
      <div>
        <Button onClick={() => setOpen(true)} variant="contained">
          Change
        </Button>
      </div>
      {open && <TxModal onClose={handleClose} steps={ChangeThresholdSteps} initialData={[initialModalData]} />}
    </Box>
  )
}

const ChangeThresholdStep = ({ data, onSubmit }: { data: ChangeThresholdData; onSubmit: (data: null) => void }) => {
  const { safe } = useSafeInfo()
  const [selectedThreshold, setSelectedThreshold] = useState<number>(data.threshold ?? 1)
  const [editableNonce, setEditableNonce] = useState<number>()
  const safeSDK = useSafeSDK()

  const [changeThresholdTx, createTxError, txLoading] = useAsync(() => {
    if (!safeSDK) {
      throw new Error('Safe SDK not initialized')
    }
    return safeSDK.getChangeThresholdTx(selectedThreshold)
  }, [selectedThreshold])

  const { safeGas, safeGasError, safeGasLoading } = useSafeTxGas(changeThresholdTx?.data)

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedThreshold(parseInt(event.target.value.toString()))
  }

  const [safeTx, safeTxError, safeTxLoading] = useAsync<SafeTransaction | undefined>(async () => {
    if (changeThresholdTx) {
      return await createTx({
        ...changeThresholdTx.data,
        nonce: editableNonce,
        safeTxGas: safeGas ? Number(safeGas.safeTxGas) : undefined,
      })
    }
  }, [editableNonce, changeThresholdTx, safeGas?.safeTxGas])

  const txError = safeGasError || createTxError || safeTxError

  return (
    <SignOrExecuteForm safeTx={safeTx} isExecutable={safe?.threshold === 1} onSubmit={onSubmit} error={txError}>
      <Typography>Any transaction requires the confirmation of:</Typography>

      <Grid container direction="row" gap={1} alignItems="center">
        <Grid item xs={1}>
          <Select value={selectedThreshold} onChange={handleChange} fullWidth>
            {safe?.owners.map((_, idx) => (
              <MenuItem key={idx + 1} value={idx + 1}>
                {idx + 1}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Typography>out of {safe?.owners.length ?? 0} owner(s)</Typography>
        </Grid>
      </Grid>

      <NonceForm
        onChange={setEditableNonce}
        recommendedNonce={safeGas?.recommendedNonce}
        safeNonce={safeGas?.currentNonce}
      />
    </SignOrExecuteForm>
  )
}
