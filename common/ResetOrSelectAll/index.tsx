import { RESET, SELECT_ALL } from '../../constants';
import { Option, notFriendlyCountries } from '../../data/attackRegionsData';
import { countMatchingStrings } from '../../helpers/helpers_1';
import {
  selectIsAttacking,
  selectPickedCountries,
  setPlaceName,
} from '../../redux/features/generalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import styles from './ResetOrSelectAll.module.scss';

interface IResetOrSelectAllProps {
  places: (IPlace | Option)[] | undefined;
  withCount?: boolean;
  setSelectedCount?: TSetNumber;
}

const ResetOrSelectAll = ({
  places,
  withCount,
  setSelectedCount,
}: IResetOrSelectAllProps) => {
  const dispatch = useAppDispatch();
  const pickedCountries = useAppSelector(selectPickedCountries);
  const isAttacking = useAppSelector(selectIsAttacking);

  let placeNames;
  let selectedCount;
  if (withCount) {
    placeNames = places?.map((p) => p.name);
    selectedCount = countMatchingStrings(
      placeNames as string[],
      pickedCountries
    );
    (setSelectedCount as TSetNumber)(selectedCount);
  }
  const resetButton = places?.some((place) =>
    pickedCountries.includes(place?.name)
  );

  const members = withCount ? placeNames : notFriendlyCountries;

  const onResetOrSelectAll = () => {
    if (resetButton) {
      dispatch(setPlaceName({ members, action: RESET }));
    } else {
      dispatch(setPlaceName({ members, action: SELECT_ALL }));
    }
  };

  return (
    <div className={styles.container}>
      {withCount && (
        <span
          className={`${isAttacking ? '' : styles.isProtecting} ${
            selectedCount !== 0 ? styles.highlighted : ''
          }`}
        >
          Выбрано: {selectedCount}
        </span>
      )}

      <button
        className={styles.resetOrSelectAllBtn}
        onClick={onResetOrSelectAll}
      >
        {resetButton ? 'сбросить все' : 'выбрать все'}
      </button>
    </div>
  );
};

export default ResetOrSelectAll;
