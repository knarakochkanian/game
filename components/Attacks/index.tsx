import AttackCard from '../AttackCard';
import styles from './Attacks.module.scss';

const Attacks = ({ attacks }: { attacks: IAttack[] }) => {
  return (
    <div className={styles.attacks}>      
      {attacks.map((attack, i) => (
        <AttackCard key={i} attack={attack} />
      ))}
    </div>
  );
};

export default Attacks;
