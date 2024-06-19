import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SxProps, Theme } from '@mui/system';
import Box from '@mui/material/Box';
import { trashHintIcon, closeXButton } from '../../../public/ui_kit';
import styles from './modal.module.scss';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  counter?: number;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  name?: string;
}

const Modal: React.FC<ModalProps> = ({
  name = '',
  isOpen,
  sx,
  onClose,
  counter,
  children,
}) => {
  const isTrashModal = name.includes('trash');
  const withClose = name.includes('withClose');
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Close modal on outside click
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const modalContent = isOpen ? (
    <aside>
      <Box
        onClick={handleOutsideClick}
        sx={sx}
        className={`${styles.modal} ${styles[name]}`}
      >
        <div>
          <div className={styles.modalCounter}>
            <Image
              src={isTrashModal ? trashHintIcon : 'onboarding/Hint_icon.svg'}
              alt={'icon'}
              width={60}
              height={45}
            />
            {withClose && (
              <button onClick={onClose} className={styles.modalCloseButton}>
                <Image
                  src={closeXButton}
                  alt={'close'}
                  width={15}
                  height={15}
                />
              </button>
            )}
            {!isTrashModal ||
              (!withClose && (
                <span className={styles.modalCounter_number}>{counter}/12</span>
              ))}
          </div>
          <div className={styles.modalMain}>{children}</div>
        </div>
      </Box>
    </aside>
  ) : null;

  if (!isBrowser) {
    return null;
  }

  return modalContent;
};

export default Modal;
