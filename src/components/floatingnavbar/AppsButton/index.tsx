import { type ReactElement, type ReactNode, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

const AppsModal = dynamic(() => import('./AppsModal'))

const AppsButton = ({ children }: { children: ReactNode }): ReactElement => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <div onClick={() => setModalOpen(true)}>
        {children}
      </div>

      {modalOpen && (
        <Suspense>
          <AppsModal 
            open={modalOpen} 
            onClose={() => setModalOpen(false)} 
          />
        </Suspense>
      )}
    </>
  )
}

export default AppsButton
