import * as BABYLON from "babylonjs";
import { MeshConfig } from "../../types/MeshConfig";

export function setMeshPool(
  scene: BABYLON.Scene,
  config: MeshConfig,
  meshes: BABYLON.Mesh[],
): [MeshConfig['type'], BABYLON.Mesh[]][] | undefined {
  if (meshes.length === 0) return;

  // Group meshes by their type
  const meshMap = new Map<MeshConfig['type'], BABYLON.Mesh[]>();

  for (const mesh of meshes) {
    // Try to get the type from mesh metadata or class name
    let meshType = config.type; // Default to config type if no metadata
    if (!meshType) continue;
    if (!meshMap.has(meshType)) {
      meshMap.set(meshType, []);
    }
    meshMap.get(meshType)!.push(mesh);
  }

  // Convert map to array of [type, meshes[]] pairs
  const result: [MeshConfig['type'], BABYLON.Mesh[]][] = Array.from(meshMap.entries());

  return result.length > 0 ? result : undefined;
}