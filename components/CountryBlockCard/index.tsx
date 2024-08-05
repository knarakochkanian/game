import { useEffect } from 'react';
import Image from 'next/image';

import { RESET, SELECT_ALL } from '../../constants';
import { Option } from '../../data/attackRegionsData';
import {
  selectActiveBlocks,
  selectIsAttacking,
  selectPickedCountries,
  setActiveBlocks,
  setPlaceName,
} from '../../redux/features/generalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import closeUsa from '../../public/onboarding/onboarding-usa-close.svg';
import { closeXProtect } from '../../public/ui_kit';

import styles from './CountryBlockCard.module.scss';

const CountryBlockCard = ({ option }: { option: Option | IPlace }) => {
  const dispatch = useAppDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);
  const pickedCountries = useAppSelector(selectPickedCountries);
  const activeBlocks = useAppSelector(selectActiveBlocks);
  const isSelected =
    activeBlocks.includes(option.name) ||
    (pickedCountries.includes(option.name) &&
      !activeBlocks.includes('ВЕСЬ МИР'));

  useEffect(() => {
    if (pickedCountries.includes(option.name)) {
      dispatch(setActiveBlocks(option.name));
    }
  }, [JSON.stringify(pickedCountries)]);

  const onClick = () => {
    const action = activeBlocks.includes(option.name) ? RESET : SELECT_ALL;

    dispatch(setPlaceName({ members: (option as Option).members, action }));
    dispatch(setActiveBlocks(option.name));
  };

  return (
    <div className={styles.container}>
      <button
        className={`AccordionNested ${styles.SecondarySmall}  ${
          styles.secondarySmallDisable
        } ${isSelected ? styles.selected : ''} ${
          !isAttacking ? styles.isProtecting : ''
        }`}
        onClick={onClick}
        style={{ opacity: 'unset' }}
      >
        <div className={`AccordionNested-helper-1 ${styles.helper_1}`}></div>
        <div className={`AccordionNested-helper-2 ${styles.helper_2}`}></div>

        <div className={styles.nameAndCloseIcon}>
          <span>
            <span className={styles.optionName}>
              <button>{option.name}</button>
            </span>
          </span>

          {isSelected && (
            <Image
              src={isAttacking ? closeUsa : closeXProtect}
              alt={'close cross'}
              width={11.3}
              height={11.3}
              style={{
                opacity: '1',
              }}
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default CountryBlockCard;
