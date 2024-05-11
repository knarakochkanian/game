import { Box3, EdgesGeometry, Group, LineBasicMaterial, LineSegments, ShapeGeometry } from "three";
import { countriesNamesToCode } from "../geodata/countries-names-to-a3-map";
import { createShapeGeometry, getCountryGeometryByA3Code, getRegionsNamesByCountryName } from "../utils/utils";
import { State } from "./state";

export class ComplexCountry {
  public A3Code: string

  public regions: State[] = []

  private contourMesh: LineSegments | undefined

  static fromName(name: string, parentGroup: Group, lineColor: string, shapeColor: string) {
    if (name !== "Соединённые Штаты Америки") {
      console.error(`Only the US are supported for now`)
      return;
    }

    const regionNames = getRegionsNamesByCountryName(name)

    const regions = regionNames.map(regionName =>
      State.fromGN_A1Code(countriesNamesToCode[regionName], lineColor, shapeColor)
    ).filter(region => !!region) as State[]

    const a3code = countriesNamesToCode[name]

    const selfGeometryForOutline = getCountryGeometryByA3Code(a3code)

    const geometry = createShapeGeometry(a3code, selfGeometryForOutline ?? [[]])

    return new ComplexCountry(a3code, geometry, regions, parentGroup, lineColor, shapeColor)
  }

  private constructor(A3Code: string, geometry: ShapeGeometry, regions: State[], parentGroup: Group, contourColor: string, shapeColor: string) {
    this.A3Code = A3Code
    this.regions = regions

    const edgesGeom = new EdgesGeometry(geometry)
    const edges = new LineSegments(edgesGeom, new LineBasicMaterial({ color: contourColor }));
    this.contourMesh = edges
    edges.position.z = 0.1
    parentGroup.add(edges)

    this.regions.forEach(region => parentGroup.add(region.createMesh()))
    this.regions.forEach(region => region.setContourVisible(false))
  }

  public setColor(color: string) {
    this.regions.forEach(region => region.setColor(color))
  }

  public setSelfContourVisible(visible: boolean) {
    if (this.contourMesh) {
      this.contourMesh.visible = visible
    }
  }

  public setChildrenContoursVisible(visible: boolean) {
    this.regions.forEach(region => region.setContourVisible(visible))
  }

  public getBoundingBox() {
    const bbox = new Box3()
    this.regions.forEach(region => {
      const regionBbox = region.getBoundingBox()
      if (regionBbox) {
        bbox.union(regionBbox)
      }
    })
    return bbox;
  }

  public dispose() {
    this.regions.forEach(state => state.dispose())
    this.contourMesh?.geometry.dispose()
    this.contourMesh = undefined
    this.regions = []
  }
}
