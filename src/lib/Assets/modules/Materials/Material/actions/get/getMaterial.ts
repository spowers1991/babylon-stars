import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";
import { createMaterialByType } from "../create/createMaterialByType";
import type { MaterialConfig } from "../../types/MaterialConfig";
import { setMaterialPool } from "@/lib/Assets/modules/Materials/actions/set/setMaterialPool";

export function getMaterial(
  scene: BABYLON.Scene,
  config: MaterialConfig
): BABYLON.Material {
  const materialsController = AssetsController.instance.materials;
  const existingMaterial = materialsController.materialsPool.find(
    (material) =>
      material.name === config.name &&
      material.getScene() === scene &&
      ((config.type === "StandardMaterial" &&
        material instanceof BABYLON.StandardMaterial) ||
        (config.type === "PBRMaterial" &&
          material instanceof BABYLON.PBRMaterial))
  );
  if (existingMaterial) return existingMaterial;

  const material = createMaterialByType(scene, config);
  setMaterialPool(
    materialsController.materialsPool,
    material,
    materialsController.ownedMaterials
  );
  materialsController.cleanUp(scene);
  return material;
}
