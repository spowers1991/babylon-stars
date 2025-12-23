import {
  Camera,
  ArcRotateCamera,
  PickingInfo,
  Scene,
  Vector3
} from "babylonjs";

export function focusCameraOnPickedMesh(
  pickInfo: PickingInfo,
  camera: Camera,
  scene: Scene,
  options?: {
    smooth?: boolean;
    lerpSpeed?: number;
    stopDistance?: number;
  }
): void {
  if (!pickInfo.hit || !pickInfo.pickedMesh) return;

  console.log("Picked mesh:", pickInfo.pickedMesh.name);

  const target = pickInfo.pickedMesh
    .getBoundingInfo()
    .boundingBox.centerWorld
    .clone();

  const smooth = options?.smooth ?? false;
  const lerpSpeed = options?.lerpSpeed ?? 0.1;
  const stopDistance = options?.stopDistance ?? 0.01;

  if (camera instanceof ArcRotateCamera) {
    if (!smooth) {
      camera.setTarget(target);
    } else {
      const anim = () => {
        camera.target = Vector3.Lerp(camera.target, target, lerpSpeed);

        if (Vector3.Distance(camera.target, target) < stopDistance) {
          camera.target = target;
          scene.onBeforeRenderObservable.removeCallback(anim);
        }
      };

      scene.onBeforeRenderObservable.add(anim);
    }
    return;
  }

  // Fallback for other cameras
  const anyCam = camera as any;
  if (typeof anyCam.setTarget === "function") {
    anyCam.setTarget(target);
  }
}
