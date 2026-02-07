import { pickParticleSPS } from "./pickParticleSPS";

export function handleSPSPicking(controller: any, object: any) {
  if(!object.sps) return
  const camera = controller.getCamera();
  return pickParticleSPS(controller.scene, camera, object.sps);
}