import Modal from '../Modals/Modal';

type TTrashModalProps = {
  name: string;
  trashModalOpen: boolean;
  closeModal: () => void;
  trashCallBack: () => void;
};

const TrashModal = ({
  closeModal,
  name,
  trashCallBack,
  trashModalOpen,
}: TTrashModalProps) => {
  return (
    <Modal
      name={name}
      isOpen={trashModalOpen}
      onClose={closeModal}
      counter={2}
      sx={{ left: '1%', top: '12% !important', position: 'absolute' }}
    >
      <p>Вы уверены что хотите удалить задачу?</p>
      <div className="ModalButtons">
        <button className="ModalButton1" onClick={trashCallBack}>
          удалить
        </button>
        <button className="SecondarySmall" onClick={closeModal}>
          <span className="TypoBodyBigLink">отмена</span>
        </button>
      </div>
    </Modal>
  );
};

export default TrashModal;
