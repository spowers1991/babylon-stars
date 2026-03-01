import * as BABYLON from "babylonjs";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { PointPickingController } from "../../../../PointPickingController";

export function setClosestPicksSPS(
  scene: BABYLON.Scene,
  spsPick: BABYLON.SolidParticle | null,
  controller: PointPickingController
) {
  controller.closestPicksSPS = ParticlesController.instance(scene).getParticlesInRadiusSPS(
    spsPick?.position!,
    5
  );
}