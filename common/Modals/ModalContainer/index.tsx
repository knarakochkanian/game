import { ReactNode } from 'react';
import Image from 'next/image';
import { closeXButton } from '../../../public/ui_kit';

import styles from './ModalContainer.module.scss';

interface IModalContainerProps {
  children: ReactNode;
  name?: string;
  setModalClose: () => void;
}

const ModalContainer = ({
  children,
  name,
  setModalClose,
}: IModalContainerProps) => {
  return (
    <dialog className={`${styles.modalContainer} ${name ? styles[name] : ''}`}>
      <div>
        <button
          role="button"
          onClick={() => {
            setModalClose();
          }}
        >
          <Image
            className={styles.closeXButton}
            src={closeXButton}
            alt="Close button"
            width={20}
            height={20}
            priority
          />
        </button>
        {children}
      </div>
    </dialog>
  );
};

export default ModalContainer;
