import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectIsAttacking } from '../redux/features/generalSlice';

const useResetMaps = (maps: TMap[]) => {
  const isAttacking = useAppSelector(selectIsAttacking);
  
  useEffect(() => {
    if (maps[0]) {
      maps.forEach((map) => {
        map.resetColors.current();
        map.resetContours.current();
      });
    }
  }, [isAttacking]);
};

export default useResetMaps;
