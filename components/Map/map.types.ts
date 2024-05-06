export enum MapType {
  sphere = 'sphere',
  plane = 'plane',
}

export interface IEarth {
  render: (parentHtmlElement: HTMLElement) => void
  highlightCountry: (name: string, color?: string) => void
  resetHighlighting: () => void
  moveCameraToCountry: (name: string) => void
  onWindowResize: () => void
  dispose: () => void
}

export interface EarthParameters {
  countries: string[]
  onCountryClick: (country: string) => void
  isNotInteractive?: boolean
  countryColor?: string
  contourColor?: string
}

export interface UseMapProps {
  mapType: MapType
  onCountryPicked: (country: string) => void
  isNotInteractive?: boolean
}
