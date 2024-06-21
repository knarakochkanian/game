'use client';

import Grid from '../../common/Grid';
import ModalContainer from '../../common/Modals/ModalContainer';
import SimCards from '../../common/SimCards';
import SystemState from '../../common/SystemState';
import Waves from '../../common/Waves';
import { simCards, waves } from '../../data/connectionData';

import styles from './ui-kit.module.scss';

export default function Test() {
  return (
    <>

      <Grid />
      <div className={styles.test}>
        <ModalContainer setModalClose={() => {}}>
          <SimCards simCards={simCards} />
        </ModalContainer>

        <ModalContainer setModalClose={() => {}}>
          <Waves waves={waves} deviceConnected={true}/>
        </ModalContainer>

        <ModalContainer setModalClose={() => {}}>
          <Waves waves={waves} deviceConnected={false}/>
        </ModalContainer>

        <ModalContainer setModalClose={() => {}}>
          <SystemState isOn />
        </ModalContainer>

        <ModalContainer setModalClose={() => {}}>
          <SystemState isOn={false} />
        </ModalContainer>
      </div>
    </>
  );
}
