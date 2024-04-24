import ModalContainer from '../../common/ModalContainer';
import SimCards from '../../common/SimCards';
import SystemState from '../../common/SystemState';
import Waves from '../../common/Waves';
import { simCards, waves } from '../../data';

import styles from './ui-kit.module.scss';

export default function Test() {
  return (
    <div className={styles.test}>
      <ModalContainer>
        <SimCards simCards={simCards} />
      </ModalContainer>

      <ModalContainer>
        <Waves waves={waves} />
      </ModalContainer>

      <ModalContainer>
        <SystemState isOn />
      </ModalContainer>

      <ModalContainer>
        <SystemState isOn={false} />
      </ModalContainer>
    </div>
  );
}
