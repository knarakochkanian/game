import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setKeyboardInput } from '../redux/features/helpersSlice';

const useResetSearch = (
  openModal: string,
  setSearchInput: TSetString,
  setInput: TSetString,
  setCursorPosition: TSetNumber
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setKeyboardInput(''));
    setSearchInput('');
    setInput('');
    setCursorPosition(0);
  }, [openModal]);
};

export default useResetSearch;
