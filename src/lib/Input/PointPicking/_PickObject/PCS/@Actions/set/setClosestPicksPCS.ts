import * as BABYLON from "babylonjs";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { PointPickingController } from "../../../../PointPickingController";

export function setClosestPicksPCS(
  scene: BABYLON.Scene,
  pcsPick: BABYLON.CloudPoint,
  controller: PointPickingController
) {
  controller.closestPicksPCS = ParticlesController.instance(scene).getParticlesInRadiusPCS(
    pcsPick.position,
    5
  );
}