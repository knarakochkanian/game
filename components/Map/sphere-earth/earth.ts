import geodata from '../geodata/geodata.json';
import usStates from '../geodata/usa-states.geo.json';
import chinaRegionsData from '../geodata/china-regions.json';
import indianStates from '../geodata/indian-states.json';
import russianStates from "../geodata/russia-states.geo.json"
import canadianStates from "../geodata/canada-states.json"
import brazilRegions from "../geodata/brazil-states.geo.json"
import australianRegions from "../geodata/australian-states.geo.json"

import Globe, { GlobeInstance } from 'globe.gl';
import { Feature } from 'geojson';
import {
  BACKGROUND_COLOR,
  DEFAULT_COLOR,
  DEFAULT_CONTOUR_COLOR,
  PICKED_COLOR,
} from '../theme';
import { EarthParameters } from '../map.types';
import {
  countriesNamesToCode,
  getCountryOrStateNameByCode,
} from '../geodata/countries-names-to-code';
import bbox from 'geojson-bbox';
import {
  FrontSide,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  RepeatWrapping,
  SphereGeometry,
  TextureLoader,
  Vector2,
} from 'three';
import { getRegionsNamesByCountryName } from '../utils/utils';
import { complexCountriesNames } from '../geodata/complex-countries';
import { IEarth } from '../IEarth';
import {
  ShaderPass,
} from 'three/examples/jsm/Addons.js';

const MIN_ZOOM_ALTITUDE = 0.5;
const MAX_ZOOM_ALTITUDE = 1.6;

export class Earth implements IEarth {
  private globe: GlobeInstance | undefined;

  private geojsonFeatureToStateCode: Map<Feature, string> = new Map<
    Feature,
    string
  >();

  private stateCodeToCurrentColor: Map<string, string> = new Map<
    string,
    string
  >();

  private stateCodeToCurrentContourVisibility: Map<string, boolean> = new Map<
    string,
    boolean
  >();

  private countryColor: string;

  private contourColor: string;

  private vignetteShaderPass: ShaderPass | undefined;

  constructor({
    onCountryClick,
    countryColor = DEFAULT_COLOR,
    contourColor = DEFAULT_CONTOUR_COLOR,
  }: EarthParameters) {
    this.contourColor = contourColor;
    this.countryColor = countryColor;

    const countriesData = geodata.features.filter(
      (d) => !['USA', 'ATA', 'CHN', 'IND', 'CAN', 'BRA', 'AUS', 'RUS'].includes(d.properties.country_a3)
    ); // filter out all countries that we show regions on
    const usStatesData = usStates.features;

    countriesData.forEach((d) => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.country_a3);
    });
    usStatesData.forEach((d) => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.gn_a1_code);
    });
    chinaRegionsData.features.forEach((d) => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.HASC_1);
    });
    indianStates.features.forEach((d) => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.NAME_1);
    });
    russianStates.features.forEach((d) => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.shapeISO);
    });
    canadianStates.features.forEach((d) => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.name);
    });
    brazilRegions.features.forEach((d) => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.name);
    });
    australianRegions.features.forEach((d) => {
      this.geojsonFeatureToStateCode.set(d as Feature, d.properties.STATE_NAME);
    });


    const polygonsData = countriesData as Feature[];
    polygonsData.push(...(usStatesData as Feature[]));
    polygonsData.push(...(chinaRegionsData.features as Feature[]));
    polygonsData.push(...(indianStates.features as Feature[]));
    polygonsData.push(...(russianStates.features as Feature[]));
    polygonsData.push(...(canadianStates.features as Feature[]));
    polygonsData.push(...(brazilRegions.features as Feature[]));
    polygonsData.push(...(australianRegions.features as Feature[]));

    const noiseTexture = new TextureLoader().load("map/noiseMap.png")
    noiseTexture.wrapS = RepeatWrapping;
    noiseTexture.wrapT = RepeatWrapping;
    noiseTexture.repeat.set(6.5, 6.5);
    const noiseMaterial = new MeshBasicMaterial({ map: noiseTexture, transparent: true, side: FrontSide, depthWrite: false, });

    const innerGlobeMaterial = new MeshBasicMaterial({ side: FrontSide, color: 'black' });

    const globe = Globe({ animateIn: false })
      .globeMaterial(innerGlobeMaterial)
      .polygonsData(polygonsData)
      .polygonCapCurvatureResolution(5)
      // .polygonStrokeColor(() => contourColor)
      .polygonAltitude(() => 0.01)
      .polygonSideColor(() => 'rgba(0, 0, 0, 0)') // hidden
      .showGraticules(true)
      .backgroundColor(`${BACKGROUND_COLOR}77`)
      .showAtmosphere(true)
      .atmosphereColor("#37403f")
      .pointerEventsFilter(obj => {
        if ("isInteractive" in obj.userData) {
          return !!obj.userData.isInteractive
        }
        return true
      })

      
      // extra sphere
      .customLayerData([{}])
      .customThreeObject(() => {
        const noiseSphere = new Mesh(
          new SphereGeometry(102, 64, 64),
          noiseMaterial
        )
        noiseSphere.userData = { isInteractive: false }
        return noiseSphere
      })

    // make main globe invisible to clicks
    globe.userData = { isInteractive: false }


    this.globe = globe;

    this.onWindowResize();

    this.updateCountryColors();

    this.resetContours();
    this.updateCountryContoursVisibility();

    this.setupOnCountryClick(onCountryClick);
  }

  private setupOnCountryClick(onCountryClick: (name: string) => void) {
    this.globe?.onPolygonClick((feature) => {
      const stateCode = this.geojsonFeatureToStateCode.get(feature as Feature);
      if (!stateCode) {
        console.error(`no state code for ${feature}`);
        return;
      }
      const name = getCountryOrStateNameByCode(stateCode);
      if (name) {
        onCountryClick(name);
      }
    });
  }

  public setCountryColor(
    name: string | string[],
    color: string = PICKED_COLOR
  ) {
    const names = Array.isArray(name) ? name : [name];

    const namesToHighlight: string[] = [];

    names.forEach((name) => {
      if (complexCountriesNames.includes(name)) {
        const regionNames = getRegionsNamesByCountryName(name);
        namesToHighlight.push(...regionNames);
      } else {
        namesToHighlight.push(name);
      }
    });

    namesToHighlight.forEach((n) => {
      const code = countriesNamesToCode[n];
      if (!code) {
        console.error(`no code for ${n}`);
        return;
      }
      this.stateCodeToCurrentColor.set(code, color);
    });
    this.updateCountryColors();
  }

  public moveCameraToCountry(
    name: string,
    animationDurationMs = 500,
    zoomOnCountry = false,
    _extendBbox?: number
  ) {
    const code = countriesNamesToCode[name];
    if (!code) {
      console.error(`no code for ${name}`);
      return;
    }
    const feature = this.getCountryFeatureByCode(code);
    if (!feature) {
      console.error(`no feature for code ${code}`);
      return;
    }
    const boundingBox = bbox(feature);
    const center = [
      (boundingBox[0] + boundingBox[2]) / 2,
      (boundingBox[1] + boundingBox[3]) / 2,
    ];

    let altitude: number | undefined
    if (zoomOnCountry) {
      const width = boundingBox[2] - boundingBox[0];
      const height = boundingBox[3] - boundingBox[1];
      const zoom = Math.max(width, height);
      altitude = MathUtils.clamp(
        zoom / 10,
        MIN_ZOOM_ALTITUDE,
        MAX_ZOOM_ALTITUDE
      );
    }

    // for Russia target coords need do be changed -- because it's in two hemispheres
    if (code === 'RUS') {
      center[0] = 95.309706;
      center[1] = 67.102754;
    }
    const pov: { lat?: number, lng?: number, altitude?: number } = { lat: center[1], lng: center[0] }
    if (altitude) {
      pov["altitude"] = altitude
    }

    this.globe?.pointOfView(
      pov,
      animationDurationMs
    );
  }

  public setCountryContourVisibility(
    name: string | string[],
    visible: boolean
  ) {
    const names = Array.isArray(name) ? name : [name];
    names.forEach((name) => {
      const code = countriesNamesToCode[name];
      if (!code) {
        console.error(`no code for ${name}`);
        return;
      }
      this.stateCodeToCurrentContourVisibility.set(code, visible);
    });

    this.updateCountryContoursVisibility();
  }

  public resetCountryColors() {
    this.stateCodeToCurrentColor.clear();
    this.updateCountryColors();
  }

  public resetContours() {
    this.stateCodeToCurrentContourVisibility.clear();
    const regionsNames: string[] = [];
    complexCountriesNames.forEach((name) => {
      const regions = getRegionsNamesByCountryName(name);
      regionsNames.push(...regions);
    });

    this.geojsonFeatureToStateCode.forEach((code, feature) => {
      const name = getCountryOrStateNameByCode(code);
      if (!name) {
        return;
      }
      if (regionsNames.includes(name)) {
        this.stateCodeToCurrentContourVisibility.set(code, false);
      }
    });
  }

  public onRotateStart(direction: 'left' | 'right', speed?: number): void {
    speed = speed ?? 2;
    speed = direction === "left" ? speed : -speed

    if (!this.globe) {
      return;
    }
    this.globe.controls().autoRotateSpeed = speed;
    this.globe.controls().autoRotate = true;
  }

  public onRotateEnd(): void {
    if (!this.globe) {
      return;
    }
    this.globe.controls().autoRotate = false;
  }


  public onWindowResize() {
    if (this.vignetteShaderPass) {
      this.vignetteShaderPass.uniforms['resolution'].value = new Vector2(
        window.innerWidth,
        window.innerHeight
      );
    }
    this.globe?.width(window.innerWidth);
    this.globe?.height(window.innerHeight);
  }

  public render(parentHtmlElement: HTMLElement) {
    if (!this.globe) {
      return;
    }

    this.globe(parentHtmlElement);

    //#region post-processing
    // const composer = this.globe.postProcessingComposer();

    // const vignette = new ShaderPass(VignetteShader);
    // vignette.uniforms["resolution"].value = new Vector2(window.innerWidth, window.innerHeight);
    // vignette.uniforms["radius"].value = .6;
    // vignette.uniforms["softness"].value = .8;
    // vignette.uniforms["gain"].value = .9;
    // this.vignetteShaderPass = vignette
    // composer.addPass(vignette);

    // const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
    // composer.addPass(gammaCorrectionPass);
    // #endregion
  }

  public dispose() {
    this.globe?._destructor();
    this.globe = undefined;
    this.vignetteShaderPass?.dispose();
    this.vignetteShaderPass = undefined;
    this.geojsonFeatureToStateCode.clear();
    this.stateCodeToCurrentColor.clear();
    this.stateCodeToCurrentContourVisibility.clear();
  }

  private updateCountryColors() {
    this.globe?.polygonCapColor((feature) => {
      const stateCode = this.geojsonFeatureToStateCode.get(feature as Feature);
      if (!stateCode) {
        return this.countryColor;
      }
      const currentColor = this.stateCodeToCurrentColor.get(stateCode);
      return currentColor ?? this.countryColor;
    });
  }

  private updateCountryContoursVisibility() {
    this.globe?.polygonStrokeColor((feature) => {
      const stateCode = this.geojsonFeatureToStateCode.get(feature as Feature);
      if (!stateCode) {
        return this.contourColor;
      }
      const visible = this.stateCodeToCurrentContourVisibility.get(stateCode);
      const isVisible = visible !== undefined ? visible : true; // set to true by default
      return isVisible ? this.contourColor : 'rgba(0, 0, 0, 0)';
    });
  }

  private getCountryFeatureByCode(targetCode: string) {
    let foundFeature: Feature | undefined;

    this.geojsonFeatureToStateCode.forEach((code, feature) => {
      if (code === targetCode) {
        foundFeature = feature;
      }
    });
    return foundFeature;
  }
}
