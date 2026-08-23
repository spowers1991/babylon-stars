import * as BABYLON from "babylonjs";

import { getPickParticleSPS } from "../get/getPickedParticleSPS";
import { PointPickingController } from "@/lib/Input/PointPicking/PointPickingController";

export function setSPSPick(scene: BABYLON.Scene, element: HTMLElement | any): BABYLON.SolidParticle | null {

  const pointPickingController = PointPickingController.instance(scene);

  if(!element.sps) return null;
  const camera = pointPickingController.getCamera();
  return getPickParticleSPS(scene, camera, element.sps);
}
