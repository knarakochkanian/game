'use client';

import { useCallback, useEffect } from 'react';
import useManagePlaceClick from '../../hooks/useManagePlaceClick';
import { setPlaceName } from '../../redux/features/generalSlice';
import { useAppDispatch } from '../../redux/hooks';
import { MapType } from './map.types';
import { UseMap } from './use-map.hook';

export interface InteractiveMapProps {
  mapType: MapType;
  // isInteractive?: boolean;
}

export const WorldMap = ({ mapType }: InteractiveMapProps) => {
  const dispatch = useAppDispatch();
  const onCountryPicked = (name: string) => {
    dispatch(setPlaceName(name));
  };

  const planeMap = UseMap({
    onCountryPicked,
    mapType: MapType.plane,
    isNotInteractive: false,
  });

  const sphereMap = UseMap({
    onCountryPicked,
    mapType: MapType.sphere,
    isNotInteractive: false,
  });

  const setCountryColor = useCallback(
    (name: string | string[], color?: string) => {
      planeMap.setCountryColor.current?.(name, color);
      sphereMap.setCountryColor.current?.(name, color);
    },
    [planeMap.setCountryColor, sphereMap.setCountryColor]
  );

  const focusOnCountry = useCallback(
    (name: string) => {
      planeMap.focusOnCountry.current?.(name);
      sphereMap.focusOnCountry.current?.(name);
    },
    [planeMap.focusOnCountry, sphereMap.focusOnCountry]
  );

  const setCountryContourVisibility = useCallback(
    (name: string | string[], visible: boolean) => {
      planeMap.setCountryContourVisibility.current?.(name, visible);
      sphereMap.setCountryContourVisibility.current?.(name, visible);
    },
    [
      planeMap.setCountryContourVisibility,
      sphereMap.setCountryContourVisibility,
    ]
  );

  const onRotateStart = useCallback(
    (direction: 'left' | 'right') => {
      sphereMap.onRotateStart.current?.(direction);
    },
    [sphereMap.onRotateStart]
  );

  const onRotateEnd = useCallback(
    (ev: React.TouchEvent) => {
      ev.preventDefault();
      sphereMap.onRotateEnd.current?.();
    },
    [sphereMap.onRotateEnd]
  );

  useManagePlaceClick(
    setCountryColor,
    focusOnCountry,
    setCountryContourVisibility
  );

  return (
    <>
      <div
        id="arrowLeft"
        role="button"
        onTouchStart={() => onRotateStart('left')}
        onTouchEnd={onRotateEnd}
        style={{
          position: 'absolute',
          width: '480px',
          height: '100vh',
          zIndex: 1,
        }}
      />
      <div
        id="arrowRight"
        role="button"
        onTouchStart={() => onRotateStart('right')}
        onTouchEnd={onRotateEnd}
        style={{
          position: 'absolute',
          width: '480px',
          height: '100vh',
          zIndex: 1,
          right: 0,
        }}
      />

      <div
        id="map-flat"
        ref={planeMap.ref}
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: '0',
          display: mapType === MapType.plane ? 'block' : 'none',
        }}
      />
      <div
        id="map-sphere"
        ref={sphereMap.ref}
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: '0',
          display: mapType === MapType.sphere ? 'block' : 'none',
        }}
      />
    </>
  );
};
