'use client';

import { useEffect } from 'react';
import { DEFAULT_COLOR, PICKED_COLOR } from './theme';
import { UseMap } from './use-map.hook';
import { MapType } from './map.types';
import { getRegionsNamesByCountryName } from './utils/utils';
import { useAppSelector } from '../../redux/hooks';
import { selectPlaceName } from '../../redux/features/generalSlice';

export interface MapProps {
  visible: boolean;
  pickedCountriesFromSideBar?: (optionName: string[]) => void;
}

export const SphereMap = ({
  visible,
  pickedCountriesFromSideBar,
}: MapProps) => {
  // пример коллбэка, который при клике по стране подсвечивает её
  const pickedCountries: string[] = [];
  const clickedPlace = useAppSelector(selectPlaceName);

  const onPolygonClick = (name: string) => {
    console.log('clicked', name);

    if (pickedCountries?.includes(name)) {
      pickedCountries.splice(pickedCountries.indexOf(name), 1);
      setCountryColor.current
        ? setCountryColor.current(name, DEFAULT_COLOR)
        : null;
      return;
    }
    pickedCountries.push(name);

    setCountryColor.current
      ? setCountryColor.current(name, PICKED_COLOR)
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
  } = UseMap({
    onCountryPicked: onPolygonClick,
    mapType: MapType.sphere,
    isNotInteractive: false,
  });

  if (focusOnCountry.current) {
    focusOnCountry.current(clickedPlace);
  }
  if (setCountryColor.current) {
    setCountryColor.current(clickedPlace);
  }

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
