import { Position } from 'geojson';
import { EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, ShapeGeometry } from 'three';
import { createShapeGeometry, getCountryGeometryByA3Code, getUSStateGeometryByGN_A1Code } from '../utils/utils';
import { ComplexCountry } from './complex-country';
import { getCountryOrStateNameByCode } from '../geodata/countries-names-to-code';

/**
 * defines a single country or one state of a complex country
 */
export class State {
  // for US states that would be GN_A1 code
  public A3Code: string

  public parentCountry: ComplexCountry | undefined;

  private geometry: Position[][] | Position[][][]

  private defaultContourColor: string

  private defaultColor: string

  private mesh: Mesh | undefined;

  private outlineMesh: LineSegments | undefined;

  static fromGeometryGetter(countryCode: string, getGeometry: (code: string) => Position[][] | Position[][][] | undefined, lineColor: string, shapeColor: string) {
    // for now for us states only
    const geometry = getGeometry(countryCode)
    if (!geometry) {
      const name = getCountryOrStateNameByCode(countryCode)
      console.error(`no geometry for ${name}`)
      return;
    }
    return new State(countryCode, geometry, lineColor, shapeColor)
  }

  static fromGN_A1Code(GN_A1Code: string, lineColor: string, shapeColor: string) {
    return State.fromGeometryGetter(GN_A1Code, getUSStateGeometryByGN_A1Code, lineColor, shapeColor);
  }

  static fromA3Code(A3Code: string, lineColor: string, shapeColor: string) {
    return State.fromGeometryGetter(A3Code, getCountryGeometryByA3Code, lineColor, shapeColor);
  }

  private constructor(A3Code: string, geometry: Position[][] | Position[][][], lineColor: string, shapeColor: string) {
    this.A3Code = A3Code
    this.geometry = geometry;
    this.defaultContourColor = lineColor;
    this.defaultColor = shapeColor;
  }

  public createMesh() {
    const geometry = createShapeGeometry(this.A3Code, this.geometry)
    const material = new MeshBasicMaterial({ color: this.defaultColor })

    const mesh = new Mesh(
      geometry,
      material,
    );

    const edgesGeom = new EdgesGeometry(geometry)
    const edges = new LineSegments(edgesGeom, new LineBasicMaterial({ color: this.defaultContourColor }));
    mesh.add(edges)
    this.outlineMesh = edges;

    mesh.name = this.A3Code
    mesh.userData = this;

    if (mesh.name === "LSO") { // overcoming the problem with improper rendering of the Lesotho
      mesh.position.z = 0.1;
    }

    this.mesh = mesh;
    return mesh;
  }

  public setColor(color: string) {
    if (!this.mesh) {
      return;
    }

    if ("material" in this.mesh && this.mesh.material instanceof MeshBasicMaterial) {
      this.mesh.material.color.set(color);
    }
  }

  public setContourVisible(enabled: boolean) {
    if (!this.outlineMesh) {
      return;
    }
    this.outlineMesh.visible = enabled;
  }

  public getBoundingBox() {
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

  public dispose() {
    this.mesh?.geometry.dispose();
    this.mesh = undefined;
    this.parentCountry = undefined;
  }
}
