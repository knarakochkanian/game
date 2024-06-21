import { DEVICE_CONNECTED, DEVICE_NOT_CONNECTED } from '../../constants';
import SingleWave, { ISingleWave } from '../SingleWave';
import styles from './Waves.module.scss';

type TWavesProps = {
  waves: ISingleWave[];
  deviceConnected: boolean;
};

const Waves = ({ waves, deviceConnected }: TWavesProps) => {
  return (
    <div className={styles.waves}>
      {waves.map((wave, i) => (
        <SingleWave
          deviceConnected={deviceConnected}
          isOn={wave.isOn}
          network={wave.network}
          num={wave.num}
          key={i}
        />
      ))}

      {
        <p className={deviceConnected ? styles.connected : styles.notConnected}>
          {deviceConnected ? DEVICE_CONNECTED : DEVICE_NOT_CONNECTED}
        </p>
      }
    </div>
  );
};

export default Waves;
