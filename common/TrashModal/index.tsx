'use client';
import Modal from '../Modals/Modal';
import { useWebSocket } from '../../contexts/WebSocketContext';
import Link from 'next/link';

type TTrashModalProps = {
  name: string;
  trashModalOpen: boolean;
  closeModal: () => void;
  trashCallBack: () => void;
  fromCountDown?: boolean;
};

const TrashModal = ({
  closeModal,
  name,
  trashCallBack,
  trashModalOpen,
  fromCountDown,
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

  const handleDeleteInCountDown = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('yep');
    }
    trashCallBack();
  };

  const handleCancelInCountDown = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('nope');
    }
    closeModal();
  };

  return (
    <Modal
      name={name}
      isOpen={trashModalOpen}
      onClose={closeModal}
      counter={2}
      sx={{ left: '1%', top: '12% !important', position: 'absolute' }}
    >
      {fromCountDown ? (
        <p> Вы уверены что хотите отменить запуск?</p>
      ) : (
        <p> Вы уверены что хотите удалить задачу?</p>
      )}
      <div className="ModalButtons">
        {fromCountDown ? (
          <Link
            style={{
              textDecoration: 'none',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            href={'launch-stopped'}
            className="ModalButton1"
            onClick={handleDeleteInCountDown}
          >
            ДА
          </Link>
        ) : (
          <button className="ModalButton1" onClick={handleDelete}>
            удалить
          </button>
        )}
        {fromCountDown ? (
          <button className="SecondarySmall" onClick={closeModal}>
            <span className="TypoBodyBigLink">НЕТ</span>
          </button>
        ) : (
          <button className="SecondarySmall" onClick={handleCancelInCountDown}>
            <span className="TypoBodyBigLink">отмена</span>
          </button>
        )}
      </div>
    </Modal>
  );
};

export default TrashModal;
