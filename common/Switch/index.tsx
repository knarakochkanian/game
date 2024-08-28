'use client';
import React, { ChangeEvent, useState } from 'react';
import styles from './Switch.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectIsAttacking } from '../../redux/features/generalSlice';

interface SwitchProps {
  isOn: boolean;
  handleSwitchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleSwitchChange }) => {
  const isAttacking = useAppSelector(selectIsAttacking);

  return (
    <label
      htmlFor="checkbox"
      className={`${styles.styledLabel} ${isOn ? styles.checked : ''}`}
    >
      <input
        id="checkbox"
        type="checkbox"
        checked={isOn}
        onChange={handleSwitchChange}
        className={styles.switchInput}
      />
      <span
        className={isAttacking ? styles.switchSlider : styles.switchSliderBlue}
      ></span>
    </label>
  );
};

export default Switch;
