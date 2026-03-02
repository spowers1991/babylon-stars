import { getPickedParticlePCS } from "../actions/get/getPickedParticlePCS";

export function handlePCSPicking(controller: any, element: any) {
  if(!element.pcs) return;
  const camera = controller.getCamera();
  return getPickedParticlePCS(controller.scene, camera, element.pcs);
}
