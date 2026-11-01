import * as BABYLON from "babylonjs";

export function runCleanMeshes(
  scene: BABYLON.Scene,
  meshPool: BABYLON.AbstractMesh[]
): void {
  scene.meshes.slice().forEach((mesh) => {
    if (
      typeof mesh.metadata?.assetPoolType === "string" &&
      !meshPool.includes(mesh)
    ) {
      mesh.dispose();
    }
  });
}
