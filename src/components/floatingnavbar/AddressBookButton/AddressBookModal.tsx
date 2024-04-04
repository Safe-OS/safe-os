import { type ReactElement } from 'react'
import AddressBookTable from '@/components/address-book/AddressBookTable'
import ModalDialog from '@/components/common/ModalDialog'

const QrModal = ({ onClose }: { onClose: () => void }): ReactElement => {
  return (
    <ModalDialog open dialogTitle="Address book" onClose={onClose}>
      <DialogContent>
        <AddressBookTable />
      </DialogContent>
    </ModalDialog>
  )
}

export default AddressBook
