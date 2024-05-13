import { Position } from "geojson";
import countriesJson from "../geodata/geodata.json"
import usStatesJson from "../geodata/usa-states.geo.json"
import { countries } from "../geodata/countries";
import merc from 'mercator-projection'
import { Vector2, Shape, ShapeGeometry } from "three";

export function getCountryGeometryByA3Code(a3Code: string): Position[][] | Position[][][] | undefined {
  for (const country of countriesJson.features) {
    if (country.properties?.country_a3 === a3Code) {
      return country.geometry?.coordinates;
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

export function getParentCountyNameByRegionName(regionName: string): string | undefined {
  for (const country of countries) {
    if (!country.regions) {
      continue
    }
    if (country.regions.find(region => region.name === regionName)) {
      return country.name
    }
  }
}

export function isPosition2dArray(a: unknown[]): a is Position[][] {
  return Array.isArray(a[0]) && Array.isArray(a[0][0]) && typeof a[0][0][0] === 'number';
}

export function createShapeGeometry(A3Code: string, geoCoords: Position[][] | Position[][][]) {
  const spareArray = [];

  for (let P of geoCoords) {
    const vecs2 = [];
    if (isPosition2dArray(P)) {
      P = P[0];
    }

    for (let i = 0; i < P.length; ++i) {
      const lat = P[i][1]
      const lng = P[i][0]
      let { x, y } = merc.fromLatLngToPoint({ lat, lng });
      // fix for russia to make eastern part of the country on the right
      if (A3Code === "RUS" && x < 50) {
        x += 256; // 256 is current tilesize
      }
      vecs2.push(new Vector2(x, -y));
    }
    spareArray.push(new Shape(vecs2));
  }

  return new ShapeGeometry(spareArray);
}
