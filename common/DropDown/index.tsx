'use client';

import { useState } from 'react';
import useCloseModal from '../../hooks/useCloseModal';
import TitleAndInfo from '../TitleAndInfo';
import DropdownArrow from '../Arrow';

import styles from './DropDown.module.scss';

interface IDropDownOption {
  value: string;
  label: string;
}

interface IDropDownProps {
  options: IDropDownOption[];
  name: string;
  title: string;
  optionsTitle?: string;
  disabled?: boolean;
  initiallySelectedOption?: IDropDownOption;
  makeTheChange?: (option: IDropDownOption) => void;
  from?: string;
}

const DropDown = ({
  options,
  name,
  title,
  initiallySelectedOption = options[0],
  makeTheChange,
  disabled,
  optionsTitle,
  from,
}: IDropDownProps) => {
  let defaultOpen = false;
  if (from && from === 'onboarding') {
    defaultOpen = true;
  }

  const className = `${name}Dropdown`;
  const [dropdownOpen, setDropdownOpen] = useState(defaultOpen);  
  const [selectedOption, setSelectedOption] = useState(initiallySelectedOption);
  
  const handleOptionChange = (option: IDropDownOption) => {
    makeTheChange && makeTheChange(option);
    setSelectedOption(option);

    setDropdownOpen(false);
  };
  const selectedOptionIndex = options.findIndex(
    (option) => option.value === selectedOption.value
  );

  const optionComponents = options.map((option) => (
    <div
      key={option.value}
      className={styles.dropdownOption}
      onClick={() => handleOptionChange(option)}
    >
      {option.label}
    </div>
  ));

  useCloseModal(dropdownOpen, setDropdownOpen, 'dialog');

  const handleDropdownOpenState = () => {
    if (disabled || dropdownOpen) return;
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={dropdownOpen ? 'true' : 'false'}
      className={`${styles.dropdownCtn} ${styles[className]} ${
        disabled ? styles.disabled : ''
      }  ${dropdownOpen ? styles.open : styles.closed}`}
      onClick={handleDropdownOpenState}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleDropdownOpenState();
          event.preventDefault();
        }
      }}
    >
      <div className={styles.dropdownHeader}>
        <TitleAndInfo info={String(selectedOptionIndex + 1)} title={title} />
      </div>
      
      {dropdownOpen && (
        <div className={styles.dialogCtn}>
          <dialog className={styles.dropdownOptions}>
            {optionsTitle && <h3>{optionsTitle}</h3>}
            {optionComponents}
          </dialog>
        </div>
      )}

      <DropdownArrow open={dropdownOpen} />
    </div>
  );
};

export default DropDown;
