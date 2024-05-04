import { Position } from "geojson";
import countriesJson from "../geodata/map+zaporizhzhia+kherson.geo.json"
import usStatesJson from "../geodata/usa-states.geo.json"
import { countries } from "../geodata/countries";

export function getCountryGeometryByA3Code(a3Code: string): Position[][] | Position[][][] | undefined {
  for (const country of countriesJson.features) {
    if (country.properties?.GU_A3 === a3Code) {
      return country.geometry.coordinates;
    }
  }
}

export function getUSStateGeometryByGN_A1Code(a1Code: string): Position[][] | Position[][][] | undefined {
  for (const country of usStatesJson.features) {
    if (country.properties?.gn_a1_code === a1Code) {
      return country.geometry.coordinates;
    }
  }
}

export function getRegionsNamesByCountryName(countryName: string): string[] {
  for (const country of countries) {
    if (country.name === countryName && country.regions) {
      return country.regions.map(region => region.name) 
    }
  }
  return []
}
