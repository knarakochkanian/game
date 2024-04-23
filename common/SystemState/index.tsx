import { stateSystemOff, stateSystemOn } from '../../constants';
import OnOffLine from '../OnOffLine';
import styles from './SystemState.module.scss';

const SystemState = ({ isOn }: { isOn: boolean }) => {
  return (
    <div className={styles.systemState}>
      <div>
        <OnOffLine isOn={isOn} />
        <h5 className={styles.systemStateTitle}>Состояние системы</h5>
      </div>
      <p>{isOn ? stateSystemOn : stateSystemOff}</p>
    </div>
  );
};

export default SystemState;
