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
        <div role="button" onClick={setModalClose}>
          <Image
            className={styles.closeXButton}
            src={closeXButton}
            alt="closeXButton"
            width={40}
            height={40}
            priority
          />
        </div>

        {children}
      </div>
    </dialog>
  );
};

export default ModalContainer;
