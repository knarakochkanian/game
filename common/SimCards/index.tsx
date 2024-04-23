import SimCard from '../SimCard';

import styles from './SimCards.module.scss';

type TSimCardsProps = {
  simCards: {
    operator: string;
    num: number;
    isOn: boolean;
  }[];
};

const SimCards = ({ simCards }: TSimCardsProps) => {
  return (
    <div className={styles.simCards}>
      {simCards.map((card) => (
        <SimCard
          key={card.num}
          isOn={card.isOn}
          operator={card.operator}
          simNum={card.num}
        />
      ))}
    </div>
  );
};

export default SimCards;
