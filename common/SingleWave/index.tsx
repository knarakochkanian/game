import {
  CONNECTED,
  NETWORK,
  NOT_CONNECTED,
  WAVE_STATE,
} from '../../constants';
import ModalData from '../Modals/ModalData';

import styles from './SingleWave.module.scss';

export interface ISingleWave {
  isOn: boolean;
  num: number;
  network: string;
  deviceConnected: boolean;
}

const SingleWave = ({ isOn, num, network, deviceConnected }: ISingleWave) => {
  return (
    <article className={styles.singleWave}>
      <div className={styles.container}>
        <h5 className={styles.num}>ВОЛНА {num}</h5>

        <div className={styles.dataContainer}>
          <ModalData name={NETWORK} value={network} />
          {deviceConnected && (
            <ModalData
              name={WAVE_STATE}
              value={isOn ? CONNECTED : NOT_CONNECTED}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default SingleWave;
