import Image from 'next/image';
import { helpIcon } from '../../public/main-screen';

import styles from './Help.module.scss';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Modal from '../../common/Modals/Modal';
const Help = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setModalOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
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
        <p>Нажмите для знакомства с работой системы</p>
      </Modal>
      <Link href={'/onboarding'} className={styles.helpIcon}>
        <Image alt="helpIcon" src={helpIcon} width={48} height={48} priority />
      </Link>
    </div>
  );
};

export default Help;
