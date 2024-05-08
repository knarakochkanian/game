import { Box3, Group } from "three";
import { DEFAULT_COLOR, DEFAULT_CONTOUR_COLOR } from "../theme";
import { countriesNamesToCode } from "../geodata/countries-names-to-a3-map";
import { getRegionsNamesByCountryName } from "../utils/utils";
import { State } from "./state";

export class ComplexCountry {
  A3Code: string

  regions: State[] = []

  static fromName(name: string, parentGroup: Group) {
    if (name !== "Соединённые Штаты Америки") {
      console.error(`Only the US are supported for now`)
      return;
    }

    const regionNames = getRegionsNamesByCountryName(name)

    const regions = regionNames.map(regionName => 
      State.fromGN_A1Code(countriesNamesToCode[regionName], DEFAULT_CONTOUR_COLOR, DEFAULT_COLOR)
  ).filter(region => !!region) as State[]

    const a3code = countriesNamesToCode[name]

    return new ComplexCountry(a3code, regions, parentGroup)
  }

  private constructor(A3Code: string, regions: State[], parentGroup: Group) {
    this.A3Code = A3Code
    this.regions = regions
    this.regions.forEach(region => parentGroup.add(region.createMesh()))
  }

  public setColor(color: string) {
    this.regions.forEach(region => region.setColor(color))
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
    this.regions = []
  }
}
