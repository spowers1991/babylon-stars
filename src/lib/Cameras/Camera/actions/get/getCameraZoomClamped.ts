import * as BABYLON from "babylonjs";

export function getCameraZoomClamped(camera: BABYLON.Camera): number | null {
 
    if (camera && camera instanceof BABYLON.ArcRotateCamera) {
    // Clamp transparency between 0 (fully transparent) and 1 (fully opaque) as a factor of zoom
      const minZoom = 1;
      const maxZoom = 100;
      // Clamp camera.radius to [minZoom, maxZoom]
      const clampedZoom = Math.max(minZoom, Math.min(maxZoom, camera.radius ?? minZoom));
      // If camera is at minZoom (2), zoomFactor = 0; at maxZoom (100), zoomFactor = 1
      const zoomFactor = (clampedZoom - minZoom) / (maxZoom - minZoom);
      // If camera is closer than minZoom, treat as fully zoomed in (0)
      if (clampedZoom <= minZoom) return 0;
      // If camera is at or beyond maxZoom, treat as fully zoomed out (1)
      if (clampedZoom >= maxZoom) return 1;
      return zoomFactor;
    }

    return null;
}