'use client';

import { DEFAULT_COLOR, PICKED_COLOR, PROTECT_BLUE } from './theme';
import { UseMap } from './use-map.hook';
import { MapType } from './map.types';
import { getRegionsNamesByCountryName } from './utils/utils';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addToPickedCountries,
  removeFromPickedCountries,
  selectIsAttacking,
} from '../../redux/features/generalSlice';
import useManagePlaceClick from '../../hooks/useManagePlaceClick';

export interface MapProps {
  visible: boolean;
  pickedCountriesFromSideBar?: (optionName: string[]) => void;
}

export const SphereMap = ({
  visible,
  pickedCountriesFromSideBar,
}: MapProps) => {
  const dispatch = useAppDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);
  const highlightColor = isAttacking ? PICKED_COLOR : PROTECT_BLUE;

  // пример коллбэка, который при клике по стране подсвечивает её
  const pickedCountries: string[] = []; 

  const onPolygonClick = (name: string) => {
    console.log('clicked', name);

    if (pickedCountries?.includes(name)) {
      dispatch(removeFromPickedCountries(name));
      pickedCountries.splice(pickedCountries.indexOf(name), 1);
      setCountryColor.current
        ? setCountryColor.current(name, DEFAULT_COLOR)
        : null;
      return;
    }

    dispatch(addToPickedCountries(name));
    pickedCountries.push(name);

    setCountryColor.current
      ? setCountryColor.current(name, highlightColor)
      : null;
    focusOnCountry.current ? focusOnCountry.current(name) : null;
  };

  const {
    ref,
    focusOnCountry,
    resetColors,
    resetContours,
    setCountryColor,
    setCountryContourVisibility,
    rotateLeft,
    rotateRight,
  } = UseMap({
    onCountryPicked: onPolygonClick,
    mapType: MapType.sphere,
    isNotInteractive: false,
  });

  useManagePlaceClick(setCountryColor, focusOnCountry);

  // пример -- как отобразить контуры штатов (по умолчанию они скрыты)
  // useEffect(() => {
  //   if (!setCountryContourVisibility.current) {
  //     return;
  //   }

  //  const stateNames = getRegionsNamesByCountryName('Соединённые Штаты Америки');

  //   setCountryContourVisibility.current(stateNames, true);
  // })

  return (
    <>
      <div
        ref={ref}
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: '0',
          display: visible ? 'block' : 'none',
        }}
      />
    </>
  );
};
