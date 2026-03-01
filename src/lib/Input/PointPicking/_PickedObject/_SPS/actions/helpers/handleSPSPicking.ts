import { getPickedParticleSPS } from "../get/getPickedParticleSPS";

export function handleSPSPicking(controller: any, object: any) {
  if(!object.sps) return;
  const camera = controller.getCamera();
  return getPickedParticleSPS(controller.scene, camera, object.sps);
}
