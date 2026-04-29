import * as BABYLON from "babylonjs";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { PointPickingController } from "../../../../PointPickingController";

export function setClosestPicksSPS(
  scene: BABYLON.Scene,
  spsPick: BABYLON.SolidParticle | undefined,
  options: { pickRadius: number },
  controller: PointPickingController
) {
  controller.closestPicksSPS = ParticlesController.instance(scene).getParticlesInRadiusSPS(
    spsPick?.position!,
    options.pickRadius
  );
  controller.closestPickSPS = spsPick as BABYLON.SolidParticle | undefined;
}