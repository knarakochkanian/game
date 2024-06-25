import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectKeyboardInput, setKeyboardInput } from '../redux/features/helpersSlice';

const useResetSearch = (
  openModal: string,
  setSearchInput: TSetString,
  setInput: TSetString,
  setCursorPosition: TSetNumber
) => {
  const dispatch = useAppDispatch();
  const defaultInputValue = useAppSelector(selectKeyboardInput);

  useEffect(() => {
    dispatch(setKeyboardInput(''));
    setSearchInput('');
    setInput('');
    setCursorPosition(0);
  }, [openModal]);
};

export default useResetSearch;
