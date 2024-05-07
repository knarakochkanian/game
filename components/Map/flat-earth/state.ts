import { Position } from 'geojson';
import { Color, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, MeshStandardMaterial, RepeatWrapping, Shape, ShapeGeometry, TextureLoader, Vector2 } from 'three';
import merc from 'mercator-projection'
import { getCountryGeometryByA3Code, getUSStateGeometryByGN_A1Code } from '../utils/utils';
import { ComplexCountry } from './complex-country';

/**
 * defines a single country or one state of a complex country
 */
export class State {
  // for US states that would be GN_A1 code
  public A3Code: string

  public parentCountry: ComplexCountry | undefined;

  private geometry: Position[][] | Position[][][]

  private lineColor: string

  private shapeColor: string

  private mesh: Mesh | undefined;

  static fromGN_A1Code(GN_A1Code: string, lineColor: string, shapeColor: string) {
    // for now for us states only
    const geometry = getUSStateGeometryByGN_A1Code(GN_A1Code)
    if (!geometry) {
      console.error(`no geometry for ${GN_A1Code}`)
      return;
    }
    return new State(GN_A1Code, geometry, lineColor, shapeColor)
  }

  static fromA3Code(A3Code: string, lineColor: string, shapeColor: string) {
    const geometry = getCountryGeometryByA3Code(A3Code)
    if (!geometry) {
      console.error(`no geometry for ${A3Code}`)
      return;
    }
    return new State(A3Code, geometry, lineColor, shapeColor)
  }

  private constructor(A3Code: string, geometry: Position[][] | Position[][][], lineColor: string, shapeColor: string) {
    this.A3Code = A3Code
    

    this.geometry = geometry;

    this.lineColor = lineColor;
    this.shapeColor = shapeColor;
  }

  createMesh() {
    const geometry = this.createGeometry(this.geometry)
    const material = new MeshBasicMaterial({ color: this.shapeColor })

    const mesh = new Mesh(
      geometry,
      material,
    );
    const edgesGeom = new EdgesGeometry(geometry)
    const edges = new LineSegments(edgesGeom, new LineBasicMaterial( { color: this.lineColor } ) );
    mesh.add(edges)

    mesh.name = this.A3Code
    mesh.userData = this;

    if (mesh.name === "LSO") { // overcoming the problem with improper rendering of the Lesotho
      mesh.position.z = 0.1;
    }

    this.mesh = mesh;
    return mesh;
  }

  createGeometry(geoCoords: Position[][] | Position[][][]) {
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
        if (this.A3Code === "RUS" && x < 50) {
          x += 256; // 256 is current tilesize
        }

        vecs2.push(new Vector2(x, -y));
      }

      spareArray.push(new Shape(vecs2));
    }

    const shapeGeo = new ShapeGeometry(spareArray);
    return shapeGeo;
  }

  setColor(color: string) {
    if (!this.mesh) {
      return;
    }

    if ("material" in this.mesh && this.mesh.material instanceof MeshBasicMaterial) {
      this.mesh.material.color.set(color);
    }
  }

  getBoundingBox() {
    const geometry = this.mesh?.geometry;
    if (!this.mesh || !(geometry instanceof ShapeGeometry)) {
      return;
    }

    geometry.computeBoundingBox();
    if (!geometry.boundingBox) {
      console.error(`no bounding box for ${this.A3Code}`)
      return;
    }

    return geometry.boundingBox.clone().applyMatrix4(this.mesh.matrixWorld);
  }

  dispose() {
    this.mesh?.geometry.dispose();
    this.mesh = undefined;
    this.parentCountry = undefined;
  }
}

function isPosition2dArray(a: unknown[]): a is Position[][] {
  return Array.isArray(a[0]) && Array.isArray(a[0][0]) && typeof a[0][0][0] === 'number';
}
