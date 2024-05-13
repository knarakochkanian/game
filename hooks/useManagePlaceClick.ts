import { MutableRefObject, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addToPickedCountries,
  removeFromPickedCountries,
  selectFirstClick,
  selectPickedCountries,
  selectPlaceName,
} from '../redux/features/generalSlice';
import { DEFAULT_COLOR, PICKED_COLOR } from '../components/Map/theme';

type TSetCountryColor = MutableRefObject<
  ((name: string | string[], color?: string | undefined) => void) | undefined
>;
type TFocusOnCountry = MutableRefObject<((name: string) => void) | undefined>;

const useManagePlaceClick = (
  setCountryColor: TSetCountryColor,
  focusOnCountry: TFocusOnCountry
) => {
  const dispatch = useAppDispatch();
  const pickedCountries: string[] = useAppSelector(selectPickedCountries);
  const clickedPlace = useAppSelector(selectPlaceName);
  const firstClick = useAppSelector(selectFirstClick);

  useEffect(() => {
    if (pickedCountries?.includes(clickedPlace)) {
      dispatch(removeFromPickedCountries(clickedPlace));

      setCountryColor.current
        ? setCountryColor.current(clickedPlace, DEFAULT_COLOR)
        : null;
    } else {
      dispatch(addToPickedCountries(clickedPlace));
      setCountryColor.current
        ? setCountryColor.current(clickedPlace, PICKED_COLOR)
        : null;
      focusOnCountry.current ? focusOnCountry.current(clickedPlace) : null;
    }
  }, [clickedPlace, firstClick]);
};

export default useManagePlaceClick;
