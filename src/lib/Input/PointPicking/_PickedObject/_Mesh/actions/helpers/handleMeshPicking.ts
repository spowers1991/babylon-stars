import { getPickMesh } from "../get/getPickMesh";

export function handleMeshPicking(controller: any) {
  const camera = controller.getCamera();
  return getPickMesh(controller.scene, camera);
}