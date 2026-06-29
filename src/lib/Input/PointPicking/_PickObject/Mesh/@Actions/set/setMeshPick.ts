import * as BABYLON from "babylonjs";
import { getPickMesh } from "../get/getPickMesh";

export function setMeshPick(scene: BABYLON.Scene) {
  const camera = scene.activeCamera;
  return getPickMesh(scene, camera as BABYLON.Camera);
}