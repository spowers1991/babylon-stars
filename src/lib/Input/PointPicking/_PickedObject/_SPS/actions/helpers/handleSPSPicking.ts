import { getPickedParticleSPS } from "../get/getPickedParticleSPS";

export function handleSPSPicking(controller: any, element: any) {
  if(!element.sps) return;
  const camera = controller.getCamera();
  return getPickedParticleSPS(controller.scene, camera, element.sps);
}
