import { type ReactElement } from 'react'
import { DialogContent } from '@mui/material'
import AddressBookTable from '@/components/address-book/AddressBookTable'
import ModalDialog from '@/components/common/ModalDialog'

const AddressBook = ({ onClose }: { onClose: () => void }): ReactElement => {
  return (
    <ModalDialog open dialogTitle="Address book" onClose={onClose}>
      <DialogContent>
        <AddressBookTable />
      </DialogContent>
    </ModalDialog>
  )
}

export default AddressBook
