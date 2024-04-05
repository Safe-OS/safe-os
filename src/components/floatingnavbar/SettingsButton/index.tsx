import { type ReactElement, type ReactNode, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

const SettingsModal = dynamic(() => import('./SettingsModal'))

const SettingsButton = ({ children }: { children: ReactNode }): ReactElement => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <div onClick={() => setModalOpen(true)}>
        {children}
      </div>

      {modalOpen && (
        <Suspense>
          <SettingsModal 
            open={modalOpen} 
            onClose={() => setModalOpen(false)} 
          />
        </Suspense>
      )}
    </>
  )
}

export default SettingsButton
