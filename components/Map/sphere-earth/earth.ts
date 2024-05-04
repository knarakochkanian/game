import geojson from "../geodata/map+zaporizhzhia+kherson.geo.json"
import usstates from "../geodata/usa-states.geo.json"
import Globe, { GlobeInstance } from "globe.gl";
import { Feature } from "geojson";
import { DEFAULT_COLOR, DEFAULT_CONTOUR_COLOR, PICKED_COLOR } from "../theme";
import { EarthParameters, IEarth } from "../map.types";
import { countriesNamesToCode, getCountryOrStateNameByCode } from "../geodata/countries-names-to-a3-map";
import bbox from 'geojson-bbox';
import { MathUtils } from "three";

const MIN_ZOOM_ALTITUDE = 0.5
const MAX_ZOOM_ALTITUDE = 1.6

export class Earth implements IEarth {
  private globe: GlobeInstance | undefined;

  private geojsonFeatureToStateCode: Map<Feature, string> = new Map<Feature, string>();

  private stateCodeToCurrentColor: Map<string, string> = new Map<string, string>();

  private countryColor: string;

  private contourColor: string;

  // private countryNameToCurrentStrokeColor: Map<string, number> = new Map<string, number>();

  constructor({ onCountryClick, countryColor = DEFAULT_COLOR, contourColor = DEFAULT_CONTOUR_COLOR }: EarthParameters) {
    this.contourColor = contourColor
    this.countryColor = countryColor

    const countriesData = geojson.features.filter(d => !["USA", "ATA"].includes(d.properties.ADM0_A3))
    const usStatesData = usstates.features

    countriesData.forEach(d => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.ADM0_A3)
    })
    usStatesData.forEach(d => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.gn_a1_code)
    })

    const polygonsData = countriesData as Feature[];
    polygonsData.push(...usStatesData as Feature[]);

    const globe = Globe()
      // .polygonsData(geojson.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
      .polygonCapCurvatureResolution(1)
      .polygonsData(polygonsData)
      .polygonStrokeColor(() => contourColor)
      .polygonAltitude(() => 0.005)
      .polygonSideColor(() => "rgba(0, 0, 0, 0)")
      .showGraticules(true)

    this.globe = globe;

    this.onWindowResize()

    this.updateCountryColors()

    this.setupOnCountryClick(onCountryClick)
  }

  private setupOnCountryClick(onCountryClick: (name: string) => void) {
    this.globe?.onPolygonClick(feature => {
      const stateCode = this.geojsonFeatureToStateCode.get(feature as Feature);
      if (!stateCode) {
        console.error(`no state code for ${feature}`)
        return;
      }
      console.log(stateCode)
      const name = getCountryOrStateNameByCode(stateCode)
      if (name) {
        onCountryClick(name)
      }
    })
  }

  public highlightCountry(name: string, color: string = PICKED_COLOR) {
    const code = countriesNamesToCode[name]
    if (!code) {
      console.error(`no code for ${name}`)
      return;
    }
    this.stateCodeToCurrentColor.set(code, color)
    this.updateCountryColors()
  }

  public moveCameraToCountry(name: string, animationDurationMs = 500) {
    const code = countriesNamesToCode[name]
    if (!code) {
      console.error(`no code for ${name}`)
      return;
    }
    const feature = this.getCountryFeatureByCode(code)
    if (!feature) {
      console.error(`no feature for code ${code}`)
      return;
    }
    const boundingBox = bbox(feature)
    const center = [(boundingBox[0] + boundingBox[2]) / 2, (boundingBox[1] + boundingBox[3]) / 2]

    const width = boundingBox[2] - boundingBox[0]
    const height = boundingBox[3] - boundingBox[1]
    const zoom = Math.max(width, height)
    const altitude = MathUtils.clamp(zoom / 10, MIN_ZOOM_ALTITUDE, MAX_ZOOM_ALTITUDE)

    this.globe?.pointOfView({ lat: center[1], lng: center[0], altitude }, animationDurationMs)
  }

  public onWindowResize() {
    this.globe?.width(window.innerWidth)
    this.globe?.height(window.innerHeight)
  }

  public render(parentHtmlElement: HTMLElement) {
    if (!this.globe) {
      return;
    }

    this.globe(parentHtmlElement)
  }

  public dispose() {
    this.globe?._destructor()
    this.globe = undefined
  }

  private updateCountryColors() {
    this.globe?.polygonCapColor(feature => {
      const stateCode = this.geojsonFeatureToStateCode.get(feature as Feature)
      if (!stateCode) {
        return this.countryColor
      }
      const currentColor = this.stateCodeToCurrentColor.get(stateCode)
      return currentColor ?? this.countryColor
    })
  }

  private getCountryFeatureByCode(targetCode: string) {
    for (const [feature, code] of this.geojsonFeatureToStateCode.entries()) {
      if (code === targetCode) {
        return feature
      }
    }
  }
}
