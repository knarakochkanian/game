import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectIsAttacking } from '../redux/features/generalSlice';
import { selectResetMapIfChanged } from '../redux/features/helpersSlice';

const useResetMaps = (maps: TMap[]) => {
  const isAttacking = useAppSelector(selectIsAttacking);
  const resetMapIfChanged = useAppSelector(selectResetMapIfChanged);

  useEffect(() => {
    if (maps[0]) {
      maps.forEach((map) => {
        map.resetColors.current();
        map.resetContours.current();
      });
    }
  }, [isAttacking, resetMapIfChanged]);
};

export default useResetMaps;
