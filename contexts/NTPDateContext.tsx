'use client';
import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react"

interface NativeNTPHandler {
    onNTPDateReceived: (raw: string | null) => string
}

export interface NTPContext {
    getDate: () => Date | null
}
const InitialState = { getDate: () => new Date() }
const NTPContext = createContext<NTPContext>(InitialState)

export function useNTP() {
    const context = useContext(NTPContext)
    if (context === undefined) {
        throw new Error('useNTP must be used within a NTPProvider')
    }
    return context
}

export function NTPProvider(props: PropsWithChildren) {
    const { children } = props
    const [dateOffset, setDateOffset] = useState<number | null>(null)

    const getDate = useCallback(() => {
        console.log("NTPContext.getDate: offset = " + dateOffset)
        if(dateOffset === null) {
            return null
        }
        const local = new Date()
        const ntp = new Date(local.getTime() + dateOffset)
        console.log("NTPContext.getDate", {
            offset: dateOffset,
            local: local,
            ntp: ntp
        })
        return ntp
    }, [dateOffset])

    useEffect(() => {
        // @ts-ignore
        (window as NativeNTPHandler).onNTPDateReceived = (raw: string) => {
            console.log("NTPContext.onNTPDateReceived", raw)
            const remote = Date.parse(raw)
            const local = new Date().getTime()
            setDateOffset(remote - local)
            return "ok"
        }
        return () => {
            // @ts-ignore
            (window as NativeNTPHandler).onNTPDateReceived = null
        }
    }, [setDateOffset])
    return <NTPContext.Provider value={{ getDate: getDate }}>{children}</NTPContext.Provider>
}