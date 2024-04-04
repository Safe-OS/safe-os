import { useAppDispatch, useAppSelector } from "@/store";
import { selectModalState } from "@/store/modalServiceSlice";
import { closeModal } from "@/store/modalServiceSlice";
import { ViewSingleTransactionModal } from "./ViewSingleTransaction";
import ViewTransactionsModal from "./ViewTransactionsModal";
import React from 'react'
import ViewCreateSafe from "./CreateSafe";
import ViewAppModal from "./ViewAppModal";
import ViewAssetsModal from "./ViewAssetsModal";

export const modalTypes = {
  viewSingleTransaction: 'viewSingleTransaction',
  viewTransactions: 'viewTransactionsModal',
  createSafe: 'createSafe',
  appModal: 'appModal',
  assetsModals: 'assetsModals',
  settingsModal: 'settingsModal',
}

export const Modals = () => {
  const dispatch = useAppDispatch();
  const activeModalState = useAppSelector((state) => selectModalState(state));

  return (
    <>
      {activeModalState?.activeModal === modalTypes.viewSingleTransaction && (
        <ViewSingleTransactionModal
          open={activeModalState?.activeModal === modalTypes.viewSingleTransaction}
          onClose={() => dispatch(closeModal())}
        />
      )}
      {activeModalState?.activeModal === modalTypes.viewTransactions && (
        <ViewTransactionsModal
          open={activeModalState?.activeModal === modalTypes.viewTransactions}
          onClose={() => dispatch(closeModal())}
        />
      )}
      {activeModalState?.activeModal === modalTypes.createSafe && (
        <ViewCreateSafe
          open={activeModalState?.activeModal === modalTypes.createSafe}
          onClose={() => dispatch(closeModal())}
        />
      )}
      {activeModalState?.activeModal === modalTypes.appModal && (
        <ViewAppModal
          open={activeModalState?.activeModal === modalTypes.appModal}
          onClose={() => dispatch(closeModal())}
        />
      )}
      {activeModalState?.activeModal === modalTypes.assetsModals && (
        <ViewAssetsModal
          open={activeModalState?.activeModal === modalTypes.assetsModals}
          onClose={() => dispatch(closeModal())}
          nfts={activeModalState?.modalProps?.nfts}
        />
      )}
    </>
  )
}

