declare module 'mercator-projection' {
    export function fromLatLngToPoint(coords: { lat: number, lng: number }): { x: number, y: number };
}

