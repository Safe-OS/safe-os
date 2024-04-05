import { Grid } from '@mui/material'
import SafeModules from '@/components/settings/SafeModules'
import TransactionGuards from '@/components/settings/TransactionGuards'
import { FallbackHandler } from '@/components/settings/FallbackHandler'

const ModulesPage = () => {
  return (
    <>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <SafeModules />
          </Grid>

          <Grid item>
            <TransactionGuards />
          </Grid>

          <Grid item>
            <FallbackHandler />
          </Grid>
        </Grid>
    </>
  )
}

export default ModulesPage
