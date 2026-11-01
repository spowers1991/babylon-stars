import * as BABYLON from "babylonjs";

export function setMaterialPool(
  materialsPool: BABYLON.Material[],
  material: BABYLON.Material,
  ownedMaterials: WeakSet<BABYLON.Material>
): void {
  if (!materialsPool.includes(material)) {
    materialsPool.push(material);
  }
  ownedMaterials.add(material);
}
