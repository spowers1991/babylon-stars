import { getPickedParticlePCS } from "../actions/get/getPickedParticlePCS";

export function handlePCSPicking(controller: any, object: any) {
  if(!object.pcs) return;
  const camera = controller.getCamera();
  return getPickedParticlePCS(controller.scene, camera, object.pcs);
}
