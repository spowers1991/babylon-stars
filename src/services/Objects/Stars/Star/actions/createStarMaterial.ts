import * as BABYLON from "babylonjs";
import { MaterialsController } from "@/lib/Assets/modules/Materials/MaterialsController";
import { AssetsController } from "@/lib/Assets/AssetsController";

/**
 * Creates and configures a PBR material for a star.
 */
export function createStarMaterial(
  scene: BABYLON.Scene,
  name: string,
  mesh: BABYLON.AbstractMesh,
  emissiveColor: BABYLON.Color3,
  emissiveIntensity: number,
): BABYLON.StandardMaterial {
  
  const assetsController = AssetsController.instance;
  const materials = assetsController.materials;
  const material = materials.createStandard(scene, `${name}`);
  materials.setEmissiveColor({ material, color: emissiveColor });
  materials.setEmissiveIntensity({ material, value: emissiveIntensity });
  mesh.material = material;

  return material;
}
