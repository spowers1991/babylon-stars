import * as BABYLON from "babylonjs";

export function getCameraZoomClamped(camera: BABYLON.Camera, options?: { inverted?: boolean }): number | null {
 
    if (camera && camera instanceof BABYLON.ArcRotateCamera) {
    // Return a normalized zoom factor where close zoom remains near 0 for longer.
      const minZoom = 1;
      const maxZoom = 100;
      // Clamp camera.radius to [minZoom, maxZoom]
      const clampedZoom = Math.max(minZoom, Math.min(maxZoom, camera.radius ?? minZoom));
      // If camera is at minZoom, zoomFactor = 0; at maxZoom, zoomFactor = 1
      const normalizedZoom = (clampedZoom - minZoom) / (maxZoom - minZoom);
      // Apply a steeper non-linear curve so zoomed-in values are even closer to 0.
      const zoomFactor = normalizedZoom * normalizedZoom * normalizedZoom;
      // If camera is closer than minZoom, treat as fully zoomed in (0)
      if (clampedZoom <= minZoom) return 0;
      // If camera is at or beyond maxZoom, treat as fully zoomed out (1)
      if (clampedZoom >= maxZoom) return options?.inverted ? 0 : 1;
      return options?.inverted ? 1 - zoomFactor : zoomFactor;
    }

    return null;
}