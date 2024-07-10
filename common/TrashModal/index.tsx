'use client';
import Modal from '../Modals/Modal';
import { useWebSocket } from '../../contexts/WebSocketContext';

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
  const webSocketContext = useWebSocket();

  if (!webSocketContext) {
    return null;
  }

  const { socket } = webSocketContext;

  const handleDelete = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('cancel');
      setTimeout(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send('ping');
        }
      }, 1000);
    }
    trashCallBack();
  };

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
        <button className="ModalButton1" onClick={handleDelete}>
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
