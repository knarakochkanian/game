import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { helpIcon } from '../../public/main-screen';
import Modal from '../../common/Modals/Modal';

import styles from './Help.module.scss';

const Help = () => {
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalOpen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className={styles.helpWrraperIcon}>
      <Modal
        isOpen={modalOpen}
        name="withClose"
        onClose={closeModal}
        sx={{
          position: 'absolute',
          top: 'unset !important',
          left: 'unset !important',
          right: '0',
          bottom: '-640px !important',
        }}
      >
        <p>
          Нажмите{' '}
          <Image
            alt="helpIcon"
            src={helpIcon}
            width={22}
            height={22}
            priority
          />{' '}
          для знакомства с работой системы
        </p>
      </Modal>
      <Link href={'/onboarding'} className={styles.helpIcon}>
        <Image alt="helpIcon" src={helpIcon} width={48} height={48} priority />
      </Link>
    </div>
  );
};

export default Help;
