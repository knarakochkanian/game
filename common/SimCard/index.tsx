import Image from 'next/image';
import { connected, notConnected } from '../../public/ui_kit';
import ModalData from '../ModalData';
import { CONNECTED, NOT_CONNECTED } from '../../constants';
import OnOffLine from '../OnOffLine';

import styles from './SimCard.module.scss';

interface ISimCardProps {
  isOn: boolean;
  simNum: number;
  operator: string;
}

const SimCard = ({ isOn, simNum, operator }: ISimCardProps) => {
  return (
    <article className={styles.simCard}>
      <div className={styles.container}>
        <div>
          <OnOffLine isOn={isOn} />
          <div className={styles.connectionCtn}>
            <h5 className={styles.simNum}>SIM {simNum}</h5>
            <Image
              className={styles.connection}
              src={isOn ? connected : notConnected}
              alt="connection"
              width={48}
              height={48}
              priority
            />
          </div>
        </div>

        <div className={styles.dataContainer}>
          <ModalData name="Оператор" value={operator} />
          <ModalData
            name="Состояние"
            value={isOn ? CONNECTED : NOT_CONNECTED}
          />
        </div>
      </div>
    </article>
  );
};

export default SimCard;
