import anime from 'animejs'
import { WebGLRenderer, Scene, PerspectiveCamera, Color, Mesh, Group, MOUSE, TOUCH, Raycaster, Vector2, Vector3, BoxGeometry, MathUtils, RepeatWrapping, TextureLoader, DoubleSide, MeshBasicMaterial, PlaneGeometry, ShapeGeometry } from "three";
import { EffectComposer, GammaCorrectionShader, MapControls, RenderPass, ShaderPass } from "three/examples/jsm/Addons.js";
import { State } from "./state";
import { PICKED_COLOR, DEFAULT_COLOR, DEFAULT_CONTOUR_COLOR, BACKGROUND_COLOR } from "../theme";
import { ComplexCountry } from "./complex-country";
import { countriesNamesToCode, getCountryOrStateNameByCode } from "../geodata/countries-names-to-a3-map";
import { EarthParameters } from '../map.types';
import { complexCountriesNames } from "../geodata/complex-countries";
import { VignetteShader } from '../utils/VignetteShader';
import { IEarth } from '../IEarth';

const FOV = 50;
const MIN_ZOOM = 40;
const MAX_ZOOM = 180;
const MAX_X = 215;
const MAX_Z = 160;
const MIN_X = 40;
const MIN_Z = 25;
const DEFAULT_ZOOM = 140;


export class FlatEarth implements IEarth {
  // todo: dispose everything
  private renderer: WebGLRenderer | undefined

  private scene: Scene | undefined

  private camera: PerspectiveCamera | undefined

  private controls: MapControls | undefined

  private composer: EffectComposer | undefined;

  private parentHtmlElement: HTMLElement | undefined

  private onCountryClick: (feature: keyof typeof countriesNamesToCode) => void

  private countries: { [A3code: string]: State | ComplexCountry } = {}

  private isNotInteractive: boolean

  private countryColor: string

  private contourColor: string

  private vignetteShaderPass: ShaderPass | undefined

  constructor({ countries, onCountryClick, isNotInteractive, countryColor = DEFAULT_COLOR, contourColor = DEFAULT_CONTOUR_COLOR }: EarthParameters) {
    this.onCountryClick = onCountryClick
    this.isNotInteractive = !!isNotInteractive
    this.contourColor = contourColor
    this.countryColor = countryColor

    const scene = createScene();
    this.scene = scene

    this.camera = createFlatEarthCamera();


    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer = renderer;

    if (!this.isNotInteractive) {
      this.controls = createFlatEarthControls(this.camera, renderer);
    }

    const composer = new EffectComposer(this.renderer);
    const pass = new RenderPass(scene, this.camera);
    composer.addPass(pass);
    this.composer = composer;

    const vignette = new ShaderPass(VignetteShader);
    vignette.uniforms["resolution"].value = new Vector2(window.innerWidth, window.innerHeight);
    vignette.uniforms["radius"].value = .65;
    vignette.uniforms["softness"].value = .65;
    vignette.uniforms["gain"].value = .9;
    this.vignetteShaderPass = vignette
    composer.addPass(vignette);

    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);  
    composer.addPass(gammaCorrectionPass);

    const mapGroup = new Group();
    mapGroup.rotateX(-Math.PI / 2);
    this.scene.add(mapGroup);
    // this.mapGroup = mapGroup;

    countries.forEach(name => {
      const a3code = countriesNamesToCode[name]
      if (!a3code) {
        console.error(`no a3code for ${name}`)
        return;
      }

      if (a3code === "ATA") {
        // skipping antartica
        return;
      }

      if (complexCountriesNames.includes(name)) {
        const complexCountry = ComplexCountry.fromName(name, mapGroup, contourColor, countryColor)
        if (complexCountry) {
          this.countries[a3code] = complexCountry
        }
        return;
      }

      const country = State.fromA3Code(a3code, contourColor, countryColor);
      if (country) {
        this.countries[a3code] = country
        const shape = country.createMesh()
        mapGroup.add(shape)
      }
    })

    // this.controls.addEventListener("change", this._render.bind(this));
    if (!this.isNotInteractive) {
      renderer.domElement.addEventListener('click', this.onClick.bind(this));
    }

    this.setCameraPositionOnMap(new Vector3((MAX_X + MIN_X) / 2, DEFAULT_ZOOM, (MAX_Z + MIN_Z) / 2), DEFAULT_ZOOM, 0)
  }

  public render(parentHtmlElement: HTMLElement) {
    if (!this.renderer) {
      return;
    }

    this.parentHtmlElement = parentHtmlElement;
    parentHtmlElement.append(this.renderer.domElement)

    !this.isNotInteractive ? this.runRenderLoop() : this._render();
  }

  public onWindowResize() {
    if (!this.camera || !this.renderer) {
      return;
    }

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer?.setSize(window.innerWidth, window.innerHeight);

    if (this.vignetteShaderPass) {
      this.vignetteShaderPass.uniforms["resolution"].value = new Vector2(window.innerWidth, window.innerHeight);
    }

    if (this.isNotInteractive) {
      this._render();
    }
  }

  public onClick(event: MouseEvent) {
    if (!this.camera || !this.scene) {
      console.log("no camera or scene")
      return;
    }
    const raycaster = new Raycaster();
    const mouse = new Vector2()

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, this.camera);

    const intersections = raycaster.intersectObject(this.scene, true);

    for (const intersection of intersections) {
      if (intersection.object.userData instanceof State) {
        const name = getCountryOrStateNameByCode(intersection.object.userData.A3Code)
        if (name) {
          this.onCountryClick(name)
        }
        return;
      }
    }
  }

  public setCountryColor(name: string | string[], color?: string) {
    const names = Array.isArray(name) ? name : [name]
    names.forEach(name => {
      const country = this.getCountryOrRegionByName(name)
      if (!country) {
        console.error(`no country with name ${name}`)
        return;
      }
  
      country.setColor(color ?? PICKED_COLOR)
    })

    if (this.isNotInteractive) {
      this._render()
    }
  }

  public moveCameraToCountry(name: string, animationDurationMs = 500, extendBbox = 50, showBoxHelperDebug?: boolean) {
    if (this.isNotInteractive) {
      animationDurationMs = 0;
    }
    if (!this.scene) {
      return;
    }

    const country = this.getCountryOrRegionByName(name)
    if (!country) {
      console.error(`no country with name ${name}`)
      return;
    }

    const center = new Vector3();
    const size = new Vector3();
    const bboxAbs = country.getBoundingBox();

    if (!bboxAbs) {
      console.error(`couldn't get bounding box for ${name}`)
      return;
    }

    bboxAbs.getCenter(center);
    bboxAbs.getSize(size)

    const zoom = (Math.max(size.x, size.y) + extendBbox) / 2 / Math.tan(Math.PI * FOV / 360);

    this.setCameraPositionOnMap(center, zoom, animationDurationMs)

    if (showBoxHelperDebug) {
      const box = new BoxGeometry(1, 1, 1);
      const cube = new Mesh(box);
      this.scene.add(cube);
      cube.position.set(center.x, center.y, center.z)
      // const helper = new BoxHelper(bboxAbs, 0xffff00);
      // this.scene.add(helper);
    }

    this.controls?.update()
    if (this.isNotInteractive) {
      this._render()
    }
  }

  public resetCountryColors() {
    for (const country of Object.values(this.countries)) {
      country.setColor(this.countryColor)
    }
  }

  public resetContours() {
    for (const country of Object.values(this.countries)) {
      if (country instanceof ComplexCountry) {
        country.setSelfContourVisible(true)
        country.setChildrenContoursVisible(false)
      } else {
        country.setContourVisible(true)
      }
    }
  }

  public setCountryContourVisibility(name: string | string[], visible: boolean) {
    const names = Array.isArray(name) ? name : [name]
    names.forEach(name => {
      const country = this.getCountryOrRegionByName(name)
      if (!country) {
        console.error(`no country with name ${name}`)
        return;
      }
  
      if (country instanceof ComplexCountry) {
        country.setSelfContourVisible(visible)
      } else {
        country.setContourVisible(visible)
      }
    })
  }

  private setCameraPositionOnMap(position: Vector3, zoom: number, animationDurationMs = 500) {
    if (!this.camera) {
      return;
    }

    const min = new Vector3(MIN_X, 0, MIN_Z);
    const max = new Vector3(MAX_X, 0, MAX_Z);
    const target = position.clone().clamp(min, max);
    zoom = MathUtils.clamp(zoom, MIN_ZOOM, MAX_ZOOM)

    if (animationDurationMs === 0) {
      this.controls?.target.set(target.x, target.y, target.z);
      this.camera.position.set(target.x, MathUtils.clamp(zoom, MIN_ZOOM, MAX_ZOOM), target.z);
      if (this.isNotInteractive) {
        this.camera.lookAt(target.x, target.y, target.z);
      }
    } else {
      anime({
        targets: this.controls?.target,
        x: target.x,
        y: target.y,
        z: target.z,
        duration: animationDurationMs,
        easing: "easeInOutQuad"
      })

      anime({
        targets: this.camera.position,
        x: target.x,
        y: MathUtils.clamp(zoom, MIN_ZOOM, MAX_ZOOM),
        z: target.z,
        duration: animationDurationMs,
        easing: "easeInOutQuad"
      })
    }

  }

  private getCountryOrRegionByName(name: string) {
    const code = countriesNamesToCode[name]
    if (!code) {
      return;
    }
    if (code in this.countries) {
      return this.countries[code]
    } else {
      for (const country of Object.values(this.countries)) {
        if (!(country instanceof ComplexCountry)) {
          continue;
        }
        return country.regions.find(region => region.A3Code === code)
      }
    }
  }

  /**
   * Used to render the scene directly for non-interactive mode
   */
  private _render() {
    if (!this.scene || !this.renderer || !this.camera) {
      return;
    }
    this.renderer?.render(this.scene, this.camera);
  }

  private runRenderLoop() {
    const camera = this.camera
    const renderer = this.renderer
    const scene = this.scene
    const controls = this.controls
    const composer = this.composer

    function animate() {
      if (!scene || !renderer || !controls || !camera) {
        return;
      }
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update()
      composer?.render()
    }
    animate();
  }

  public dispose() {
    Object.values(this.countries).forEach(country => {
      country.dispose();
    })
    this.countries = {};

    this.controls?.dispose()
    this.renderer?.dispose()

    if (this.renderer?.domElement) {
      this.renderer?.domElement.removeEventListener('click', this.onClick, false);
      this.parentHtmlElement?.removeChild(this.renderer.domElement)
    }

    this.vignetteShaderPass = undefined;
    this.composer = undefined;
    this.renderer = undefined;
    this.scene = undefined;
    this.camera = undefined;
    this.controls = undefined;
    // this.mapGroup = undefined;
    this.parentHtmlElement = undefined;
  }


}

function createScene(): Scene {
  const scene = new Scene();
  scene.background = new Color(BACKGROUND_COLOR);

  const geometry = new PlaneGeometry(512, 512);


  const noiseTexture = new TextureLoader().load("map/noiseMap.png")
  noiseTexture.wrapS = RepeatWrapping;
  noiseTexture.wrapT = RepeatWrapping;
  noiseTexture.repeat.set(6.5, 6.5);
  const noiseMaterial = new MeshBasicMaterial({ map: noiseTexture });
  const noiseBackgroundMesh = new Mesh(geometry, noiseMaterial);
  noiseBackgroundMesh.rotateX(-Math.PI / 2);
  noiseBackgroundMesh.position.set(128, 5, 128)
  noiseMaterial.transparent = true;
  noiseMaterial.opacity = 0.5
  scene.add(noiseBackgroundMesh);

  const gridTexture = new TextureLoader().load("map/grid.png")
  gridTexture.wrapS = RepeatWrapping;
  gridTexture.wrapT = RepeatWrapping;
  gridTexture.repeat.set(1.3, 2.5);
  const gridMaterial = new MeshBasicMaterial({ map: gridTexture });
  gridMaterial.transparent = true;
  gridMaterial.opacity = 0.1
  const gridBackgroundMesh = new Mesh(geometry, gridMaterial);
  gridBackgroundMesh.rotateX(-Math.PI / 2);
  gridBackgroundMesh.position.set(128, -5, 128)
  scene.add(gridBackgroundMesh);

  return scene;
}

function createFlatEarthControls(camera: PerspectiveCamera, renderer: WebGLRenderer, isNotInteractive = false): MapControls {
  const controls = new MapControls(camera, renderer.domElement);
  controls.minDistance = MIN_ZOOM;
  controls.maxDistance = MAX_ZOOM;
  controls.minPolarAngle = 0;
  controls.enableRotate = false;
  controls.mouseButtons = {
    LEFT: MOUSE.PAN,
  }
  controls.touches = {
    ONE: TOUCH.PAN,
    TWO: TOUCH.DOLLY_ROTATE
  }

  controls.target.set((MAX_X + MIN_X) / 2, 0, (MAX_Z + MIN_Z) / 2);

  const minPan = new Vector3(MIN_X, 0, MIN_Z);
  const maxPan = new Vector3(MAX_X, 0, MAX_Z);
  const tempVector = new Vector3();

  controls.addEventListener("change", function () {
    tempVector.copy(controls.target);
    controls.target.clamp(minPan, maxPan);
    tempVector.sub(controls.target);
    camera.position.sub(tempVector);
  })

  return controls
}

function createFlatEarthCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 1, 10000);
  return camera;
}
