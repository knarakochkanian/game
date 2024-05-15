'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '../../redux/hooks';
import { ATTACK_OR_PROTECT } from '../../constants';
import { setIsAttacking } from '../../redux/features/generalSlice';

import styles from './SelectFromTwo.module.scss';

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
  const [disabledBtn, setDisabledBtn] = useState(2);
  const dispatch = useAppDispatch();

  const handleBtn_1_Click = () => {
    setDisabledBtn(2);
    if (name === ATTACK_OR_PROTECT) {
      dispatch(setIsAttacking(true));
    } else {
      (setFirstActive as setFirstActive)(true);
    }
  };

  const handleBtn_2_Click = () => {
    setDisabledBtn(1);
    if (name === ATTACK_OR_PROTECT) {
      dispatch(setIsAttacking(false));
    } else {
      (setFirstActive as setFirstActive)(false);
    }
  };

  return (
    <div className={`${styles.selectFromTwo} ${name ? styles[name] : ''}`}>
      <div className={styles.selectFromTwoAttack}>
        <button
          className={`${styles.button_1} ${
            disabledBtn === 1 ? styles.disabled : ''
          }`}
          onClick={handleBtn_1_Click}
        >
          {button_1}
        </button>
        <div>
          <Image
            onClick={handleBtn_1_Click}
            src={imgSrc_1}
            alt={'Icon'}
            width={88}
            height={88}
          />
          <Image
            onClick={handleBtn_2_Click}
            src={imgSrc_2}
            alt={'Icon'}
            width={88}
            height={88}
          />
        </div>
        <button
          className={`${styles.button_2} ${
            disabledBtn === 2 ? styles.disabled : ''
          }`}
          onClick={handleBtn_2_Click}
        >
          {button_2}
        </button>
      </div>
    </div>
  );
};

export default SelectFromTwo;
