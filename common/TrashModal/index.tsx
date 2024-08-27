'use client';
import Modal from '../Modals/Modal';
import Link from 'next/link';
import { useDeviceConnection } from '../../contexts/WebSocketContext';
import { MouseEvent, useCallback } from 'react';
type TTrashModalProps = {
  name: string;
  trashModalOpen: boolean;
  closeModal: () => void;
  trashCallBack: () => void;
  fromCountDown?: boolean;
  onResetState?: () => void; // Добавлен новый пропс
};

const TrashModal = ({
  closeModal,
  name,
  trashCallBack,
  trashModalOpen,
  fromCountDown,
  // onResetState, // Деструктурируем новый пропс
}: TTrashModalProps) => {
  const { send } = useDeviceConnection()!;

  const handleDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      send('cancel');
      send('ping');
      event.stopPropagation();

      trashCallBack();
    },
    [send, trashCallBack]
  );

  const handleDeleteInCountDown = useCallback(() => {
    send('yep');
    // if (onResetState) {
    //   onResetState(); // Вызываем функцию сброса состояния
    // }
    trashCallBack();
  }, [send, trashCallBack]);

  const handleCancelInCountDown = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      send('nope');
      send('ping');
      event.stopPropagation();

      closeModal();
    },
    [send, closeModal]
  );

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
          <button
            className="ModalButton1"
            onClick={(event) => handleDelete(event)}
          >
            удалить
          </button>
        )}
        {fromCountDown ? (
          <button
            className="SecondarySmall"
            onClick={(event) => handleCancelInCountDown(event)}
          >
            <span className="TypoBodyBigLink">НЕТ</span>
          </button>
        ) : (
          <button
            className="SecondarySmall"
            onClick={(event) => handleCancelInCountDown(event)}
          >
            <span className="TypoBodyBigLink">отмена</span>
          </button>
        )}
      </div>
    </Modal>
  );
};

export default TrashModal;
