'use client';
import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
//import { countries } from "../data/countries";
//import { FlatEarth } from "../components/Map/flat-earth/flat-earth";
//import { Earth } from "../components/Map/sphere-earth/earth";
import { IEarth } from "../components/Map/IEarth";
import { useAppSelector } from "../redux/hooks";
import { selectIsAttacking, selectPickedCountriesObjects } from "../redux/features/generalSlice";
import { PICKED_COLOR, PROTECT_BLUE } from "../components/Map/theme";
//import { useAppDispatch } from "../redux/hooks";
//import { setPlaceName } from "../redux/features/generalSlice";

//const countriesNamesList = countries.map(country => country.name)

export interface MapContext {
    isMapLoaded: boolean,
    flatEarth: IEarth | null
    globeEarth: IEarth | null
    setLoaded: (v: boolean, e: IEarth | null) => void,
}
const InitialState = { isMapLoaded: false, setLoaded: () => { }, flatEarth: null, globeEarth: null }
const MapContext = createContext<MapContext>(InitialState)

export function useMapContext() {
    const context = useContext(MapContext)
    if (context === undefined) {
        throw new Error('useMapContext must be used within a MapProvider')
    }
    return context
}

export function MapProvider(props: PropsWithChildren) {
    const { children } = props
    //const dispatch = useAppDispatch();

    const selectedCountries = useAppSelector(selectPickedCountriesObjects);
    const isAttacking = useAppSelector(selectIsAttacking);
    const highlightColor = isAttacking ? PICKED_COLOR : PROTECT_BLUE;
    const [isLoaded, setLoaded] = useState(false)
    const [initialStateLoaded, setInitialStateLoaded] = useState(false)

    const [earth, setEarth] = useState<IEarth | null>()

    useEffect(() => {
        console.log("EarthLoadingLoop.MapContext1")
        if (earth && !initialStateLoaded && selectedCountries) {
            console.log("Country color.isLoaded.c", selectedCountries)
            selectedCountries.forEach(c => {
                earth.setCountryColor(c.name, highlightColor)
                console.log("Country color debug MAP CONTEXT", c)
            })
            setInitialStateLoaded(true)
        }
    }, [earth, setInitialStateLoaded, initialStateLoaded, selectedCountries])

    const onEarthLoaded = useCallback((loaded: boolean, earth: IEarth | null) => {
        setLoaded(loaded)
        setEarth(loaded ? earth : null)
        if(!loaded) {
            setInitialStateLoaded(false)
        }
    }, [setInitialStateLoaded, setLoaded, selectedCountries])
    // const onCountryPicked = useCallback((country: string) => {
    //     dispatch(setPlaceName(country));
    // }, [])

    // const flatEarch = useMemo(() => {
    //     return new FlatEarth({ countries: countriesNamesList, onCountryClick: onCountryPicked, isNotInteractive: false })
    // },[onCountryPicked])

    // const globeEarth = useMemo(() => {
    //     return new Earth({ countries: countriesNamesList, onCountryClick: onCountryPicked, isNotInteractive: false , setLoaded: setLoaded })
    // },[onCountryPicked]) 

    return <MapContext.Provider value={{
        isMapLoaded: isLoaded,
        setLoaded: onEarthLoaded,
        flatEarth: null,
        globeEarth: null

    }}>{children}</MapContext.Provider>
}