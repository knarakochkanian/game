import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectCloseSelectionIfChanged } from '../redux/features/helpersSlice';

const useCloseSelection = (
  setSelectOpen: TSetBoolean,
  setSelectDamageOpen: TSetBoolean,
  setSelectIndustryOpen: TSetBoolean
) => {
  const closeSelectionIfChanged = useAppSelector(selectCloseSelectionIfChanged);

  useEffect(() => {
    setSelectOpen(false);
    setSelectDamageOpen(false);
    setSelectIndustryOpen(false);
  }, [closeSelectionIfChanged]);
};

export default useCloseSelection;
