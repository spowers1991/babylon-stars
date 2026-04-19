import * as BABYLON from "babylonjs";

export function setMeshToMeshes(meshes : BABYLON.Mesh[], mesh : BABYLON.Mesh): void {
 meshes.push(mesh);
}