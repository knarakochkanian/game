// Switch/index.tsx
import React, { ChangeEvent, useState } from 'react';
import styles from './Switch.module.scss';

interface SwitchProps {
  isOn: boolean;
  handleSwitchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleSwitchChange }) => {
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
      <span className={styles.switchSlider}></span>
    </label>
  );
};

export default Switch;
