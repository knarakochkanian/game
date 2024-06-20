import ModalData from '../Modals/ModalData';

import styles from './SimCard.module.scss';

interface ISimCardProps {
  simNum: number;
  operator: string;
}

const SimCard = ({ simNum, operator }: ISimCardProps) => {
  return (
    <article className={styles.simCard}>
      <div className={styles.container}>
        <h5 className={styles.simNum}>SIM {simNum}</h5>
        <ModalData name="Оператор" value={operator} />
      </div>
    </article>
  );
};

export default SimCard;
