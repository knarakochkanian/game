import Image from 'next/image';
import ModalContainer from '../ModalContainer';

import styles from './InfoModal.module.scss';

interface IInfoModalProps {
  setModalClose: () => void;
  infoName: string;
}

const InfoModal = ({ setModalClose, infoName }: IInfoModalProps) => {
  return (
    <ModalContainer setModalClose={setModalClose} name="infoModal">
      <div className={styles.iconImgCtn}>
        <Image
          src={'onboarding/Hint_icon.svg'}
          alt={'icon'}
          width={60}
          height={45}
        />
      </div>
      <p className={styles.paragraph}>
        Текстовая подсказка с описанием того, что подразумевается под{' '}
        {infoName} уровнем ущерба.
      </p>
    </ModalContainer>
  );
};

export default InfoModal;
