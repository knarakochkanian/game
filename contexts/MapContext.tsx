'use client';
import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
//import { countries } from "../data/countries";
//import { FlatEarth } from "../components/Map/flat-earth/flat-earth";
//import { Earth } from "../components/Map/sphere-earth/earth";
import { IEarth } from "../components/Map/IEarth";
//import { useAppDispatch } from "../redux/hooks";
//import { setPlaceName } from "../redux/features/generalSlice";

//const countriesNamesList = countries.map(country => country.name)

export interface MapContext {
    isMapLoaded: boolean,
    flatEarth: IEarth | null
    globeEarth: IEarth | null
    setLoaded: (v: boolean) => void
}
const InitialState = { isMapLoaded: false, setLoaded: () => {}, flatEarth: null, globeEarth: null }
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

    const [isLoaded, setLoaded] = useState(false)
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
        setLoaded: setLoaded,
        flatEarth: null,
        globeEarth: null

     }}>{children}</MapContext.Provider>
}