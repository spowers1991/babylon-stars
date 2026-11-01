import * as BABYLON from "babylonjs";
import { AssetsController } from "@/lib/Assets/AssetsController";
import type { MaterialConfig } from "../../types/MaterialConfig";

export function createMaterial(
  scene: BABYLON.Scene,
  config: MaterialConfig
): BABYLON.Material {
  return AssetsController.instance.materials.getMaterial(scene, config);
}
