import { stateSystemOff, stateSystemOn } from '../../constants';
import styles from './SystemState.module.scss';

const SystemState = ({ isOn }: { isOn: boolean }) => {
  return (
    <div className={styles.systemState}>
        <h5 className={styles.systemStateTitle}>Состояние системы</h5>
      <p>{isOn ? stateSystemOn : stateSystemOff}</p>
    </div>
  );
};

export default SystemState;
