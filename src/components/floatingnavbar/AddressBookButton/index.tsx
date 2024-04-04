import { type ReactElement, type ReactNode, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

const AddressBook = dynamic(() => import('./AddressBookModal'))

const AddressBookButton = ({ children }: { children: ReactNode }): ReactElement => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <div data-testid="qr-modal-btn" onClick={() => setModalOpen(true)}>
        {children}
      </div>

      {modalOpen && (
        <Suspense>
          <AddressBook onClose={() => setModalOpen(false)} />
        </Suspense>
      )}
    </>
  )
}

export default AddressBookButton
