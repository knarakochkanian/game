"use client"

import { useCallback, useEffect } from "react";
import { MapType } from "./map.types";
import { UseMap } from "./use-map.hook";

export const StaticMap = ({ pickedCountries }: { pickedCountries: string[] }) => {
  const onCountryPicked = () => {};

  const map = UseMap({
    onCountryPicked,
    mapType: MapType.plane,
    isNotInteractive: true,
  });

  const setCountryColor = useCallback(
    (name: string | string[], color?: string) => {
      map.setCountryColor.current?.(name, color);
    },
    [map.setCountryColor]
  );

  const focusOnCountry = useCallback(
    (name: string, animationDurationMs?: number, zoomOnCountry?: boolean, extendBbox?: number) => {
      map.focusOnCountry.current?.(name, animationDurationMs, zoomOnCountry, extendBbox);
    },
    [map.focusOnCountry]
  );

  const setCountryContourVisibility = useCallback(
    (name: string | string[], visible: boolean) => {
      map.setCountryContourVisibility.current?.(name, visible);
    },
    [
      map.setCountryContourVisibility,
    ]
  );

  useEffect(() => {
    focusOnCountry(pickedCountries[0], undefined, true);
    setCountryColor(pickedCountries);
  }, [focusOnCountry, pickedCountries, setCountryColor])

  return (
    <>
      <div
        id="static-map-flat"
        ref={map.ref}
        style={{
          width: '100%',
          height: '100%',
          top: '0',
        }}
      />
    </>
  )
}
