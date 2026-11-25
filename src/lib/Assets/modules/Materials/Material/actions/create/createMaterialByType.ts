import * as BABYLON from "babylonjs";
import type { MaterialConfig } from "../../types/MaterialConfig";

export function createMaterialByType(
  scene: BABYLON.Scene,
  config: MaterialConfig
): BABYLON.Material {
  switch (config.type) {
    case "StandardMaterial":
      return new BABYLON.StandardMaterial(config.name, scene);
    case "PBRMaterial":
      return new BABYLON.PBRMaterial(config.name, scene);
    default: {
      const exhaustiveCheck: never = config;
      throw new Error(`Unsupported material type: ${String(exhaustiveCheck)}`);
    }
  }
}
