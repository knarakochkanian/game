import { RESET, SELECT_ALL } from '../../constants';
import { RegionCategory } from '../../data/attackRegionsData';
import {
  proccesIndustriesByTitle,
} from '../../redux/features/generalSlice';
import { useAppDispatch } from '../../redux/hooks';

import style from './ResetOrSelectAll_2.module.scss';

const ResetOrSelectAll_2 = ({
  selectedOtionsCount,
  data,
}: {
  selectedOtionsCount: number | undefined;
  data: RegionCategory;
}) => {
  const dispatch = useAppDispatch();

  const onResetOrSelectAll = () => {
    if (selectedOtionsCount) {
      dispatch(
        proccesIndustriesByTitle({
          actionType: RESET,
          title: data.title as string,
        })
      );
    } else {
      dispatch(
        proccesIndustriesByTitle({
          actionType: SELECT_ALL,
          title: data.title as string,
        })
      );
    }
  };

  return (
    <div className={style.resetOrSelectAllCtn}>
      <span className={selectedOtionsCount !== 0 ? style.highlighted : ''}>
        Выбрано: {selectedOtionsCount}
      </span>

      <button
        className={style.resetOrSelectAllBtn}
        onClick={onResetOrSelectAll}
      >
        {(selectedOtionsCount as number) > 0 ? 'сбросить все' : 'выбрать все'}
      </button>
    </div>
  );
};

export default ResetOrSelectAll_2;
