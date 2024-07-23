import { MapType } from "./map.types"

export interface IEarth {

  getType: () => MapType
  /**
   * Sets html element where map will be rendered
   */
  render: (parentHtmlElement: HTMLElement) => void

  /**
   * sets the rendering color of a country
   * @param name name of the country (or state/region)
   * @param color color in hex format ("#FFFFFF"). if not set it will be set to default
   */
  setCountryColor: (name: string | string[], color?: string) => void

  /**
   * enables/disables outline of a country
   * @param name name of the country (or state/region)
   * @param visible if outline should be rendered
   */
  setCountryContourVisibility: (name: string | string[], visible: boolean) => void

  /**
   * Sets color of all countries to default
   */
  resetCountryColors: () => void

  /**
   * Sets all outlines to default
   */
  resetContours: () => void

  /**
   * @param name name of the country (or state/region)
   * @param animationDurationMs literally the amount of time for camera move
   * @param extendBbox the higher, the more distant zoom will be
   */
  moveCameraToCountry: (name: string, animationDurationMs?: number, zoomOnCountry?: boolean, extendBbox?: number) => void

  onRotateStart(direction: "left" | "right", speed?: number): void

  onRotateEnd(): void

  onWindowResize: () => void

  dispose: () => void
}
