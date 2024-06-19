import { useEffect } from 'react';
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

import styles from './CountryBlockCard.module.scss';

const CountryBlockCard = ({ option }: { option: Option | IPlace }) => {
  const dispatch = useAppDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);
  const pickedCountries = useAppSelector(selectPickedCountries);
  const activeBlocks = useAppSelector(selectActiveBlocks);

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
        className={`AccordionNested ${styles.secondarySmallDisable} ${
          activeBlocks.includes(option.name) ||
          pickedCountries.includes(option.name)
            ? styles.selected
            : ''
        } ${!isAttacking ? styles.isProtecting : ''}`}
        onClick={onClick}
        style={{ opacity: 'unset' }}
      >
        <div className={'AccordionNested-helper-1'}></div>
        <div className={'AccordionNested-helper-2'}></div>
        <span>
          <span className={styles.optionName}>
            <button>{option.name}</button>
          </span>
        </span>
      </button>
    </div>
  );
};

export default CountryBlockCard;
