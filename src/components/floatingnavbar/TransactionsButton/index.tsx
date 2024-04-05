import { type ReactElement, type ReactNode, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

const TransactionsModal = dynamic(() => import('./TransactionsModal'))

const TransactionsButton = ({ children }: { children: ReactNode }): ReactElement => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <div onClick={() => setModalOpen(true)}>
        {children}
      </div>

      {modalOpen && (
        <Suspense>
          <TransactionsModal 
            open={modalOpen} 
            onClose={() => setModalOpen(false)} 
          />
        </Suspense>
      )}
    </>
  )
}

export default TransactionsButton
