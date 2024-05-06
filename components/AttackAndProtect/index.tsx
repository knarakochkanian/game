import Image from 'next/image';
import styles from './AttackAndProtect.module.scss';

const AttackAndProtect = () => {
  return (
    <div className={styles.attackAndProtect}>
      <div className={styles.attackAndProtectAttack}>
        <button>атака</button>
        <div>
          <Image
            src={'onboarding/AttackSign.svg'}
            alt={'attack'}
            width={48}
            height={48}
          />
          <Image
            src={'onboarding/ProtectSign.svg'}
            alt={'protect'}
            width={48}
            height={48}
          />
        </div>
        <button>защита</button>
      </div>
    </div>
  );
};

export default AttackAndProtect;
