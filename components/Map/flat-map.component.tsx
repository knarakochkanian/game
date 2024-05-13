'use client';

import { DEFAULT_COLOR, PICKED_COLOR, PROTECT_BLUE } from './theme';
import { UseMap } from './use-map.hook';
import { MapType } from './map.types';
import { getRegionsNamesByCountryName } from './utils/utils';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToPickedCountries, removeFromPickedCountries, selectIsAttacking, selectPlaceName } from '../../redux/features/generalSlice';
import useManagePlaceClick from '../../hooks/useManagePlaceClick';

export interface MapProps {
  visible: boolean;
}

export const FlatMap = ({ visible }: MapProps) => {
  const dispatch = useAppDispatch();
  const isAttacking = useAppSelector(selectIsAttacking);
  const highlightColor = isAttacking ? PICKED_COLOR : PROTECT_BLUE;

  // пример коллбэка, который при клике по стране подсвечивает её
  const pickedCountries: string[] = [];
  const onPolygonClick = (name: string) => {
    console.log('clicked', name);

    if (pickedCountries.includes(name)) {
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
    resetContours,
    resetColors,
    setCountryColor,
    setCountryContourVisibility,
  } = UseMap({
    onCountryPicked: onPolygonClick,
    mapType: MapType.plane,
    isNotInteractive: false,
  });

  // пример -- как подсветить определенную страну
  // useEffect(() => {
  //   focusOnCountry.current("Соединённые Штаты Америки")
  // })

  // пример -- как отобразить контуры штатов (по умолчанию они скрыты)
  // useEffect(() => {
  //   if (!setCountryContourVisibility.current) {
  //     return;
  //   }

  //   const stateNames = getRegionsNamesByCountryName('Соединённые Штаты Америки');

  //   setCountryContourVisibility.current(stateNames, true);
  // })
 
  useManagePlaceClick(setCountryColor, focusOnCountry);

  return (
    <>
      <div
        ref={ref}
        style={{
          width: '100%',
          height: '100%',
          display: visible ? 'block' : 'none',
        }}
      />
    </>
  );
};
