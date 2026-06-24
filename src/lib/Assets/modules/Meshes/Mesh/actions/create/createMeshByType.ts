import * as BABYLON from "babylonjs";
import { MeshConfig } from "../../types/MeshConfig";

export function createMeshByType(
  scene: BABYLON.Scene,
  config: MeshConfig,
): BABYLON.AbstractMesh {

  switch (config.type) {
    case "SphereMesh":
      return BABYLON.MeshBuilder.CreateSphere(config.name, config.options as MeshConfig["options"], scene);
    case "BoxMesh":
      return BABYLON.MeshBuilder.CreateBox(config.name, config.options as MeshConfig["options"], scene);
    case "CylinderMesh":
      return BABYLON.MeshBuilder.CreateCylinder(config.name, config.options as MeshConfig["options"], scene);
    case "PlaneMesh":
      return BABYLON.MeshBuilder.CreatePlane(config.name, config.options as MeshConfig["options"], scene);
    default:
      throw new Error(`Unsupported mesh type: ${config.type}`);
  }
  
}
