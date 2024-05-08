import AttackCard from '../AttackCard';
import styles from './Attacks.module.scss';

export interface IAttacksProps {
  attacks: IAttack[];
  setAttackId: TSetString;
}

const Attacks = ({ attacks, setAttackId }: IAttacksProps) => {
  return (
    <div className={styles.attacks}>
      {attacks.map((attack, i) => (
        <AttackCard setAttackId={setAttackId} key={i} attack={attack} />
      ))}
    </div>
  );
};

export default Attacks;
