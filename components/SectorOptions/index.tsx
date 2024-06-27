import Image from 'next/image';
import {
  selectIsAttacking,
  setSelectedIndusties,
} from '../../redux/features/generalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import styles from './SectorOptions.module.scss';
import { minusSign } from '../../public/main-screen';
import React from 'react';

interface ISectorOptionsProps {
  sectorOptions: ISectorOption[];
  fromSideNav?: boolean;
  fromLeftSideNav?: boolean;
  src?: string;
}

const SectorOptions = ({
  sectorOptions,
  fromSideNav,
  fromLeftSideNav,
}: ISectorOptionsProps) => {
  const dispatch = useAppDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);
  const onClick = (name: string, parent: string) => {
    dispatch(setSelectedIndusties({ name, parent }));
  };

  return (
    <div className={styles.container}>
      {sectorOptions.map((option, i) => (
        <div
          key={i}
          className={
            !fromSideNav
              ? styles.optionContainer
              : styles.optionContainerSideNav
          }
        >
          <button
            disabled={fromSideNav}
            onClick={() => onClick(option.name, option.parent)}
            className={`${styles.option} ${
              option.selected && fromLeftSideNav ? styles.selected : ''
            } ${!option.selected && fromSideNav ? styles.displayNone : ''}
            ${!isAttacking ? styles.isProtecting : ''}
            ${option.src ? styles.hasImage : ''}`}
          >
            {option.src && (
              <Image src={option.src} alt="img" width={23} height={23} />
            )}
            {option.name}
          </button>
          {fromSideNav && option.selected && (
            <button
              onClick={() => onClick(option.name, option.parent)}
              className={styles.minusButton}
            >
              <Image
                className={styles.minusSign}
                src={minusSign}
                alt="minusSign"
                width={20}
                height={20}
                priority
              />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectorOptions;
