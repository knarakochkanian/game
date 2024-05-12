'use client';

import Image from 'next/image';
import styles from './SelectFromTwo.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { ATTACK_OR_PROTECT } from '../../constants';
import { setIsAttacking } from '../../redux/features/generalSlice';

type setFirstActive = (bool: boolean) => void;

interface ISelectFromTwoProps {
  button_1: string;
  button_2: string;
  imgSrc_1: string;
  imgSrc_2: string;
  name?: string;
  setFirstActive?: setFirstActive;
}

const SelectFromTwo = ({
  button_1,
  button_2,
  imgSrc_1,
  imgSrc_2,
  name,
  setFirstActive,
}: ISelectFromTwoProps) => {
  const dispatch = useAppDispatch();

  const handleBtn_1_Click = () => {
    if (name === ATTACK_OR_PROTECT) {
      dispatch(setIsAttacking(true));
    } else {
      (setFirstActive as setFirstActive)(true);
    }
  };

  const handleBtn_2_Click = () => {
    if (name === ATTACK_OR_PROTECT) {
      dispatch(setIsAttacking(false));
    } else {
      (setFirstActive as setFirstActive)(false);
    }
  };

  return (
    <div className={`${styles.selectFromTwo} ${name ? styles[name] : ''}`}>
      <div className={styles.selectFromTwoAttack}>
        <button onClick={handleBtn_1_Click}>{button_1}</button>
        <div>
          <Image src={imgSrc_1} alt={'Icon'} width={48} height={48} />
          <Image src={imgSrc_2} alt={'Icon'} width={48} height={48} />
        </div>
        <button onClick={handleBtn_2_Click}>{button_2}</button>
      </div>
    </div>
  );
};

export default SelectFromTwo;
