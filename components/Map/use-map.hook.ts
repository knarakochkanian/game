import { useCallback, useEffect, useRef, useState } from "react";
import { FlatEarth } from "./flat-earth/flat-earth";
import { MapType, UseMapProps } from "./map.types";
import { Earth } from "./sphere-earth/earth";
import { IEarth } from "./IEarth";
import { countries } from "../../data/countries";
import { useMapContext } from "../../contexts/MapContext";

const countriesNamesList = countries.map(country => country.name)

export const UseMap = ({ onCountryPicked, mapType, isNotInteractive = false }: UseMapProps) => {
  const ref = useRef(null);

  const setCountryColor = useRef<(name: string | string[], color?: string) => void>()
  const setCountryContourVisibility = useRef<(name: string | string[], visible: boolean) => void>()
  const focusOnCountry = useRef<(name: string, animationDurationMs?: number, zoomOnCountry?: boolean, extendBbox?: number) => void>()
  const resetColors = useRef<() => void>()
  const resetContours = useRef<() => void>()
  const onRotateStart = useRef<(direction: "left" | "right", speed?: number) => void>()
  const onRotateEnd = useRef<() => void>()
  const onWindowResize = useRef<() => void>()

  const {setLoaded} = useMapContext()

  const [isLoadedEarth, setLoadedEarth] = useState(false);
  const earthRef = useRef<IEarth>()

  useEffect(() => {
    console.log("EarthLoadingLoop.useMapHook", isLoadedEarth, earthRef.current)
    setLoaded(isLoadedEarth, earthRef.current || null)
  }, [isLoadedEarth, earthRef, setLoaded])

  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    console.log("EarthLoadingLoop.createNewEarth")
    const earth: IEarth = mapType === MapType.plane
      ? new FlatEarth({ countries: countriesNamesList, onCountryClick: onCountryPicked, isNotInteractive }) 
      : new Earth({ countries: countriesNamesList, onCountryClick: onCountryPicked, isNotInteractive, setLoaded: setLoadedEarth })

    if(mapType === MapType.sphere) {
      earthRef.current = earth
    }
    earth.render(ref.current)

    setCountryColor.current = earth.setCountryColor.bind(earth)
    setCountryContourVisibility.current = earth.setCountryContourVisibility.bind(earth)
    focusOnCountry.current = earth.moveCameraToCountry.bind(earth)
    resetColors.current = earth.resetCountryColors.bind(earth)
    resetContours.current = earth.resetContours.bind(earth)
    onRotateStart.current = earth.onRotateStart.bind(earth)
    onRotateEnd.current = earth.onRotateEnd.bind(earth)
    onWindowResize.current = earth.onWindowResize.bind(earth)

    const onResize = () => {
      earth.onWindowResize()
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      earth?.dispose()
    }
  }, [])

  return { ref, setCountryColor, focusOnCountry, resetColors, setCountryContourVisibility, resetContours, onRotateStart, onRotateEnd, onWindowResize }
}
