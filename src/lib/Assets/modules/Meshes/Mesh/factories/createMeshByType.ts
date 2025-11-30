import * as BABYLON from "babylonjs";
import { MeshType, MeshOptions } from "../types/Mesh";

export function createMeshByType(
  scene: BABYLON.Scene,
  meshType: MeshType,
  name: string,
  options: MeshOptions
): BABYLON.Mesh {
  switch (meshType) {
    case "sphere":
      return BABYLON.MeshBuilder.CreateSphere(name, options as any, scene);
    case "box":
      return BABYLON.MeshBuilder.CreateBox(name, options as any, scene);
    case "cylinder":
      return BABYLON.MeshBuilder.CreateCylinder(name, options as any, scene);
    case "plane":
      return BABYLON.MeshBuilder.CreatePlane(name, options as any, scene);
    default:
      throw new Error(`Unsupported mesh type: ${meshType}`);
  }
}
