import SingleWave, { ISingleWave } from '../SingleWave';
import styles from './Waves.module.scss';

const Waves = ({ waves }: { waves: ISingleWave[] }) => {
  return (
    <div className={styles.waves}>
      {waves.map((wave) => (
        <SingleWave
          ip={wave.ip}
          isOn={wave.isOn}
          network={wave.network}
          num={wave.num}
          key={wave.ip}
        />
      ))}
    </div>
  );
};

export default Waves;
