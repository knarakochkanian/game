import { ReactNode } from 'react';
import Image from 'next/image';
import { closeXButton } from '../../public/ui_kit';

import styles from './ModalContainer.module.scss';

const ModalContainer = ({ children }: { children: ReactNode }) => {
  return (
    <dialog className={styles.modalContainer}>
      <div>
        <div role='button'>
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
