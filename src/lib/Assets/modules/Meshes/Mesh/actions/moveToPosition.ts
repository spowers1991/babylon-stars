import * as BABYLON from "babylonjs";

export function moveToParticle(
  mesh: BABYLON.AbstractMesh,
  position?: BABYLON.Vector3
) {
  if (!mesh || !position) return;

  mesh.position.copyFrom(position); 
}
