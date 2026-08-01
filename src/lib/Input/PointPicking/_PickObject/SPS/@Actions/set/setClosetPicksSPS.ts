import * as BABYLON from "babylonjs";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { PointPickingController } from "../../../../PointPickingController";

export function setClosestPicksSPS(
  scene: BABYLON.Scene,
  spsPick: BABYLON.SolidParticle | undefined,
  options: { pickRadius: number }
) {
  const controller = PointPickingController.instance(scene);

  const sourceSps = (spsPick as any)?._sps as BABYLON.SolidParticleSystem | undefined;
  const worldMatrix = sourceSps?.mesh?.computeWorldMatrix(true);
  const center = spsPick
    ? worldMatrix
      ? BABYLON.Vector3.TransformCoordinates(spsPick.position, worldMatrix)
      : spsPick.position
    : undefined;

  controller.closestPicksSPS = ParticlesController.instance(scene).getParticlesInRadiusSPS(
    center!,
    options.pickRadius
  );
  controller.closestPickSPS = spsPick as BABYLON.SolidParticle | undefined;
}