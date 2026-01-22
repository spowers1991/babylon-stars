import { pickParticlePCS } from "./pickParticlePCS";

export function handlePCSPicking(controller: any, object: any) {
  const camera = controller.getCamera();
  return pickParticlePCS(controller.scene, camera, object.pcs, 0.2);
}