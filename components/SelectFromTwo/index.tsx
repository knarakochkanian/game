import Image from 'next/image';
import styles from './SelectFromTwo.module.scss';

interface ISelectFromTwoProps {
  button_1: string;
  button_2: string;
  imgSrc_1: string;
  imgSrc_2: string;
}

const SelectFromTwo = ({
  button_1,
  button_2,
  imgSrc_1,
  imgSrc_2,
}: ISelectFromTwoProps) => {
  return (
    <div className={styles.selectFromTwo}>
      <div className={styles.selectFromTwoAttack}>
        <button>{button_1}</button>
        <div>
          <Image
            src={imgSrc_1}
            alt={'Icon'}
            width={48}
            height={48}
          />
          <Image
            src={imgSrc_2}
            alt={'Icon'}
            width={48}
            height={48}
          />
        </div>
        <button>{button_2}</button>
      </div>
    </div>
  );
};

export default SelectFromTwo;

{
  /* <div className={styles.selectFromTwo}>
      <div className={styles.selectFromTwoAttack}>
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
    </div> */
}
