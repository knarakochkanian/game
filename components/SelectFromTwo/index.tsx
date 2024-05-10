import Image from 'next/image';
import styles from './SelectFromTwo.module.scss';

interface ISelectFromTwoProps {
  button_1: string;
  button_2: string;
  imgSrc_1: string;
  imgSrc_2: string;
  name?: string;
  setFirstActive: (bool: boolean) => void;
}

const SelectFromTwo = ({
  button_1,
  button_2,
  imgSrc_1,
  imgSrc_2,
  name,
  setFirstActive,
}: ISelectFromTwoProps) => {
  return (
    <div className={`${styles.selectFromTwo} ${name ? styles[name] : ''}`}>
      <div className={styles.selectFromTwoAttack}>
        <button onClick={() => setFirstActive(true)}>{button_1}</button>
        <div>
          <Image src={imgSrc_1} alt={'Icon'} width={48} height={48} />
          <Image src={imgSrc_2} alt={'Icon'} width={48} height={48} />
        </div>
        <button onClick={() => setFirstActive(false)}>{button_2}</button>
      </div>
    </div>
  );
};

export default SelectFromTwo;
