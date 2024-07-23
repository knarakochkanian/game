'use client';
import React, { PropsWithChildren, createContext, useCallback, useContext, useState } from "react"
import { IEarth } from "../components/Map/IEarth";
import { useAppSelector, useAppStore } from "../redux/hooks";
import { selectIsAttacking, selectPickedCountriesObjects } from "../redux/features/generalSlice";
import { PICKED_COLOR, PROTECT_BLUE } from "../components/Map/theme";
import { MapType } from "../components/Map/map.types";

export interface MapContext {
    isMapLoaded: boolean,
    flatEarth: IEarth | null
    globeEarth: IEarth | null
    setLoaded: (v: boolean, e: IEarth | null, type: MapType) => void,
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
    const store = useAppStore()

    const isAttacking = useAppSelector(selectIsAttacking);
    const highlightColor = isAttacking ? PICKED_COLOR : PROTECT_BLUE;
    const [isLoaded, setLoaded] = useState(false)

    const updateSelectedCountries = useCallback((earth: IEarth) => {
        const selectedCountries = store.getState().generalReducer.pickedCountriesObjects

        const names = selectedCountries.reduce((acc: string[], c: IPlace) => {
            if(c.isSelected && !c.regions) {
                return [...acc, c.name]
            } else {
                return [
                    ...acc, 
                    ...(c.regions?.filter(r => r.isSelected).map(r => r.name) || [])
                ]
            }
        }, [])
        earth.setCountryColor(names, highlightColor)
    }, [store])

    const onEarthLoaded = useCallback((loaded: boolean, earth: IEarth | null, type: MapType) => {
        console.log("MapDebug.onEarthLoaded", earth !== null, type)
        if(type == MapType.sphere) {
            setLoaded(loaded)
        }
        if(earth !== null) {
            updateSelectedCountries(earth)
        }
    }, [setLoaded, updateSelectedCountries])

    return <MapContext.Provider value={{
        isMapLoaded: isLoaded,
        setLoaded: onEarthLoaded,
        flatEarth: null,
        globeEarth: null

    }}>{children}</MapContext.Provider>
}