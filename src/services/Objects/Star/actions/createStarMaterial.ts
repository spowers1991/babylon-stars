import * as BABYLON from "babylonjs";
import { MaterialsController } from "@/lib/Assets/modules/Materials/MaterialsController";

/**
 * Creates and configures a PBR material for a star.
 */
export function createStarMaterial(
  scene: BABYLON.Scene,
  name: string,
  texture: BABYLON.Texture,
  emissiveColor: BABYLON.Color3,
  emissiveIntensity: number
): BABYLON.StandardMaterial {
  
  const materials = new MaterialsController();

  const material = materials.createStandard(scene, `${name}-PBR`);

  materials.setAlbedoTexture({ material, texture });
  materials.setEmissiveColor({ material, color: emissiveColor });
  materials.setEmissiveIntensity({ material, value: emissiveIntensity });

  return material;
}
