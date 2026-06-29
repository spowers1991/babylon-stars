import { getPickedParticlePCS } from "../get/getPickedParticlePCS";

export function setPCSPick(controller: any, element: any) {
  if(!element.pcs) return;
  const camera = controller.getCamera();
  return getPickedParticlePCS(controller.scene, camera, element.pcs);
}
