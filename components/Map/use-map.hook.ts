import { useEffect, useRef } from "react";
import { FlatEarth } from "./flat-earth/flat-earth";
import { countries } from "./geodata/countries";
import { IEarth, MapType, UseMapProps } from "./map.types";
import { Earth } from "./sphere-earth/earth";

const countriesNamesList = countries.map(country => country.name)

export const UseMap = ({ onCountryPicked, mapType, isNotInteractive = false }: UseMapProps) => {
  const ref = useRef(null);

  const highlightCountry = useRef<(name: string, color?: string) => void>()
  const focusOnCountry = useRef<(name: string) => void>()

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const earth: IEarth = mapType === MapType.plane
      ? new FlatEarth({ countries: countriesNamesList, onCountryClick: onCountryPicked, isNotInteractive }) 
      : new Earth({ countries: countriesNamesList, onCountryClick: onCountryPicked, isNotInteractive })

    earth.render(ref.current)

    highlightCountry.current = earth.highlightCountry.bind(earth)
    focusOnCountry.current = earth.moveCameraToCountry.bind(earth)

    const onResize = () => {
      earth.onWindowResize()
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      earth?.dispose()
    }
  }, [])

  return { ref, highlightCountry, focusOnCountry }
}
