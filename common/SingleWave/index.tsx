import {
  CONNECTED,
  IP,
  NETWORK,
  NOT_CONNECTED,
  WAVE_STATE,
} from '../../constants';
import ModalData from '../Modals/ModalData';
import OnOffLine from '../OnOffLine';

import styles from './SingleWave.module.scss';

export interface ISingleWave {
  isOn: boolean;
  num: number;
  ip: string;
  network: string;
}

const SingleWave = ({ isOn, num, ip, network }: ISingleWave) => {
  return (
    <article className={styles.singleWave}>
      <div className={styles.container}>
        <div>
          <OnOffLine isOn={isOn} />
          <h5 className={styles.num}>ВОЛНА {num}</h5>
        </div>

        <div className={styles.dataContainer}>
          <ModalData name={NETWORK} value={network} />
          <ModalData
            name={WAVE_STATE}
            value={isOn ? CONNECTED : NOT_CONNECTED}
          />
          <ModalData name={IP} value={ip} />
        </div>
      </div>
    </article>
  );
};

export default SingleWave;
