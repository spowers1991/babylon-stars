import { pickMesh } from "./pickMesh";

export function handleMeshPicking(controller: any) {
  const camera = controller.getCamera();
  return pickMesh(controller.scene, camera);
}