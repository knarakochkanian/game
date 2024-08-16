'use client';
import Modal from '../Modals/Modal';
import Link from 'next/link';
import { useDeviceConnection } from '../../contexts/WebSocketContext';
import { useCallback } from 'react';

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
  const { send } = useDeviceConnection()!;

  const handleDelete = useCallback(() => {
    send('cancel');
    send('ping');

    trashCallBack();
  }, [send, trashCallBack]);

  const handleDeleteInCountDown = useCallback(() => {
    send('yep');
    trashCallBack();
  }, [send, trashCallBack]);

  const handleCancelInCountDown = useCallback(() => {
    send('nope');
    send('ping');

    closeModal();
  }, [send, closeModal]);

  return (
    <Modal
      name={name}
      isOpen={trashModalOpen}
      onClose={closeModal}
      counter={2}
      sx={{
        left: '1%',
        top: '12% !important',
        position: 'absolute',
      }}
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
          <button className="SecondarySmall" onClick={handleCancelInCountDown}>
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
