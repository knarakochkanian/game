import geojson from "../geodata/geodata.json"
import usstates from "../geodata/usa-states.geo.json"
import Globe, { GlobeInstance } from "globe.gl";
import { Feature } from "geojson";
import { BACKGROUND_COLOR, DEFAULT_COLOR, DEFAULT_CONTOUR_COLOR, PICKED_COLOR } from "../theme";
import { EarthParameters, IEarth } from "../map.types";
import { countriesNamesToCode, getCountryOrStateNameByCode } from "../geodata/countries-names-to-a3-map";
import bbox from 'geojson-bbox';
import { MathUtils, Mesh, MeshBasicMaterial, RepeatWrapping, TextureLoader } from "three";
import { getRegionsNamesByCountryName } from "../utils/utils";
import { complexCountriesNames } from "../geodata/complex-countries";

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

    const countriesData = geojson.features.filter(d => !["USA", "ATA"].includes(d.properties.country_a3))
    const usStatesData = usstates.features

    countriesData.forEach(d => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.country_a3)
    })
    usStatesData.forEach(d => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.gn_a1_code)
    })

    const polygonsData = countriesData as Feature[];
    polygonsData.push(...usStatesData as Feature[]);

    // const noiseTexture = new TextureLoader().load("map/noiseMap.png")
    // noiseTexture.wrapS = RepeatWrapping;
    // noiseTexture.wrapT = RepeatWrapping;
    // noiseTexture.repeat.set(6.5, 6.5);
    // const noiseMaterial = new MeshBasicMaterial({ map: noiseTexture });

    const globe = Globe({ animateIn: false })
      .polygonsData(polygonsData)
      .polygonCapCurvatureResolution(5)
      .polygonStrokeColor(() => contourColor)
      .polygonAltitude(() => 0.01)
      .polygonSideColor(() => "rgba(0, 0, 0, 0)") // hidden
      .showGraticules(true)
      .backgroundColor(BACKGROUND_COLOR)
      .showAtmosphere(false)

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
      const name = getCountryOrStateNameByCode(stateCode)
      if (name) {
        onCountryClick(name)
      }
    })
  }

  public highlightCountry(name: string, color: string = PICKED_COLOR) {
    let namesToHighlight: string[];
    if (complexCountriesNames.includes(name)) {
      const regionNames = getRegionsNamesByCountryName(name)
      namesToHighlight = regionNames
    } else {
      namesToHighlight = [name]
    }

    namesToHighlight.forEach(n => {
      const code = countriesNamesToCode[n]
      if (!code) {
        console.error(`no code for ${n}`)
        return;
      }
      this.stateCodeToCurrentColor.set(code, color)
    })
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

    // for Russia target coords need do be changed -- because it's in two hemispheres
    if (code === "RUS") {
      center[0] = 95.309706
      center[1] = 67.102754
    }

    this.globe?.pointOfView({ lat: center[1], lng: center[0], altitude }, animationDurationMs)
  }

  public resetHighlighting() {
    this.stateCodeToCurrentColor.clear()
    this.updateCountryColors()
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
