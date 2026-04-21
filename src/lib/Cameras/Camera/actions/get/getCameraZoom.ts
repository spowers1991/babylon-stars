import * as BABYLON from "babylonjs";

export interface GetCameraZoomOptions {
    inverted?: boolean;
    minZoom?: number;
    maxZoom?: number;
}

export function getCameraZoom(
    camera: BABYLON.Camera,
    options: GetCameraZoomOptions = {}
): number | null {
    if (camera && camera instanceof BABYLON.ArcRotateCamera) {
        const radius = camera.radius;
        if (!options.inverted) {
            return radius;
        }
        // Invert zoom within a range
        const minZoom = options.minZoom ?? 1;
        const maxZoom = options.maxZoom ?? 100;
        // Clamp radius to [minZoom, maxZoom]
        const clamped = Math.max(minZoom, Math.min(maxZoom, radius ?? minZoom));
        // Invert: closer (min) becomes max, farther (max) becomes min
        return maxZoom - (clamped - minZoom);
    }
    return null;
}