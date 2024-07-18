export enum MapType {
  sphere = 'sphere',
  plane = 'plane',
}

export interface EarthParameters {
  countries: string[]
  onCountryClick: (country: string) => void
  isNotInteractive?: boolean
  countryColor?: string
  contourColor?: string
  setLoaded?: (isLoaded: boolean) => void
}

export interface UseMapProps {
  mapType: MapType
  onCountryPicked: (country: string) => void
  isNotInteractive?: boolean
}
