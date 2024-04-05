import { type ReactElement, type ReactNode, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

const AssetsModal = dynamic(() => import('./AssetsModal'))

const AssetsButton = ({ children }: { children: ReactNode }): ReactElement => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const nftsDefaultValue = false

  return (
    <>
      <div onClick={() => setModalOpen(true)}>
        {children}
      </div>

      {modalOpen && (
        <Suspense>
          <AssetsModal 
            open={modalOpen} 
            nfts={nftsDefaultValue} 
            onClose={() => setModalOpen(false)} 
          />
        </Suspense>
      )}
    </>
  )
}

export default AssetsButton
