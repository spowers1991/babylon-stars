import * as BABYLON from "babylonjs";

export function runCleanMaterials(
  scene: BABYLON.Scene,
  materialsPool: BABYLON.Material[],
  ownedMaterials: WeakSet<BABYLON.Material>
): BABYLON.Material[] {
  const removedMaterials: BABYLON.Material[] = [];

  scene.materials.slice().forEach((material) => {
    if (
      !(material instanceof BABYLON.ShaderMaterial) &&
      ownedMaterials.has(material) &&
      !materialsPool.includes(material)
    ) {
      material.dispose();
      removedMaterials.push(material);
    }
  });

  return removedMaterials;
}
