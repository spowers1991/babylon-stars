import { pickParticlePCS } from "./pickParticlePCS";

export function handlePCSPicking(controller: any, object: any) {
  if(!object.pcs) return
  const camera = controller.getCamera();
  return pickParticlePCS(controller.scene, camera, object.pcs);
}