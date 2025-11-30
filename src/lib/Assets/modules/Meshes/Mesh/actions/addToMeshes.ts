import * as BABYLON from "babylonjs";

export function addToMeshes(meshes : BABYLON.Mesh[], mesh : BABYLON.Mesh): void {
 meshes.push(mesh);
}