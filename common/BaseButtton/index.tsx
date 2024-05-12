import React, { ReactNode } from 'react';
import styles from './BaseButton.module.scss';
import clsx from 'clsx';

interface BaseButtonProps {
  children?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  protectMode?: boolean;
}

function BaseButton({
  children,
  active,
  disabled,
  onClick,
  protectMode,
}: BaseButtonProps) {
  const buttonClass = clsx({
    [protectMode ? styles.protectModeActive : styles.buttonActive]: active,
    [styles.buttonBase]: !active,
    [styles.buttonDisabled]: disabled,
  });

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      <span
        className={clsx(styles.spanBase, {
          [protectMode ? styles.protectSpanActive : styles.spanActive]: active,
        })}
        style={{ left: '-5px', top: '-5px' }}
      ></span>
      <span
        className={clsx(styles.spanBase, {
          [protectMode ? styles.protectSpanActive : styles.spanActive]: active,
        })}
        style={{ right: '-5px', top: '-5px' }}
      ></span>
      <span
        className={clsx(styles.spanBase, {
          [protectMode ? styles.protectSpanActive : styles.spanActive]: active,
        })}
        style={{ left: '-5px', bottom: '-5px' }}
      ></span>
      <span
        className={clsx(styles.spanBase, {
          [protectMode ? styles.protectSpanActive : styles.spanActive]: active,
        })}
        style={{ right: '-5px', bottom: '-5px' }}
      ></span>
      {children}
    </button>
  );
}
export default BaseButton;
