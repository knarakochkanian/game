declare module 'geojson-bbox' {
    export default function bbox(geojson: Feature): [number, number, number, number];
}
