"use client"

import { useCallback } from "react";
import useManagePlaceClick from "../../hooks/useManagePlaceClick";
import { setPlaceName } from "../../redux/features/generalSlice";
import { useAppDispatch } from "../../redux/hooks";
import { MapType } from "./map.types";
import { UseMap } from "./use-map.hook";

export interface MapProps {
  mapType: MapType;
}

export const WorldMap = ({ mapType }: MapProps) => {
  const dispatch = useAppDispatch();

  const onPolygonClick = (name: string) => {
    dispatch(setPlaceName(name));
  }

  const planeMap = UseMap({
    onCountryPicked: onPolygonClick,
    mapType: MapType.plane,
    isNotInteractive: false,
  });

  const sphereMap = UseMap({
    onCountryPicked: onPolygonClick,
    mapType: MapType.sphere,
    isNotInteractive: false,
  });

  const setCountryColor = useCallback((name: string | string[], color?: string) => {
    planeMap.setCountryColor.current?.(name, color);
    sphereMap.setCountryColor.current?.(name, color);
  }, [planeMap.setCountryColor, sphereMap.setCountryColor])

  const focusOnCountry = useCallback((name: string) => {
    planeMap.focusOnCountry.current?.(name);
    sphereMap.focusOnCountry.current?.(name);
  }, [planeMap.focusOnCountry, sphereMap.focusOnCountry])

  const setCountryContourVisibility = useCallback((name: string | string[], visible: boolean) => {
    planeMap.setCountryContourVisibility.current?.(name, visible);
    sphereMap.setCountryContourVisibility.current?.(name, visible);
  }, [planeMap.setCountryContourVisibility, sphereMap.setCountryContourVisibility])

  useManagePlaceClick(setCountryColor, focusOnCountry, setCountryContourVisibility);

  return (
    <>
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
