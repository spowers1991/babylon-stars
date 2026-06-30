import * as BABYLON from "babylonjs";

export interface GetCameraDistanceToMeshClampedOptions {
  minDistance?: number;
  maxDistance?: number;
}

export function getCameraDistanceToMeshClamped(
  camera: BABYLON.Camera,
  targetMesh: BABYLON.AbstractMesh,
  options: GetCameraDistanceToMeshClampedOptions = {}
): number | null {
  if (!camera || !targetMesh) {
    return null;
  }

  const minDistance = options.minDistance ?? 1;
  const maxDistance = options.maxDistance ?? 100;
  const distance = BABYLON.Vector3.Distance(
    camera.globalPosition,
    targetMesh.getAbsolutePosition()
  );

  return Math.max(
    0,
    Math.min(1, (distance - minDistance) / (maxDistance - minDistance))
  );
}