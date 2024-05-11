'use client';

import { DEFAULT_COLOR, PICKED_COLOR } from '../Map/theme';
import { MapType } from '../Map/map.types';
import { UseMap } from '../Map/use-map.hook';

import styles from './Globe.module.scss';

export interface MapProps {
  visible: boolean;
}

const Globe = ({ visible }: MapProps) => {
  const pickedCountries: string[] = [];

  const onPolygonClick = (name: string) => {
    console.log('clicked', name);

    if (pickedCountries.includes(name)) {
      pickedCountries.splice(pickedCountries.indexOf(name), 1);
      highlightCountry.current
        ? highlightCountry.current(name, DEFAULT_COLOR)
        : null;
      return;
    }

    pickedCountries.push(name);

    highlightCountry.current
      ? highlightCountry.current(name, PICKED_COLOR)
      : null;
    focusOnCountry.current ? focusOnCountry.current(name) : null;
  };

  const { ref, highlightCountry, focusOnCountry, resetHighlighting } = UseMap({
    onCountryPicked: onPolygonClick,
    mapType: MapType.sphere,
    isNotInteractive: false,
  });

  return (
    <>
      <div
        className={`${styles.globe} ${visible ? '' : styles.diplayNone}`}
        ref={ref}
      ></div>
    </>
  );
};

export default Globe;
