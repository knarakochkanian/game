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
  const onPolygonClick = (name: string) => {
    dispatch(addToPickedCountries(name));
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
 
  // useManagePlaceClick(setCountryColor, focusOnCountry, setCountryContourVisibility);

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
