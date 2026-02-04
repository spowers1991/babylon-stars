import * as BABYLON from "babylonjs";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { PointPickingController } from "../PointPickingController";

export function setNearbyData(
  scene: BABYLON.Scene,
  data: any[],
  setter: (data: any[]) => void
) {
  const particlesController = ParticlesController.instance(scene);
  const pickingController = PointPickingController.instance(scene);

  const nearbyData = particlesController.particlesToDataPCS(
    pickingController.closestPicksPCS,
    data
  );

  setter(nearbyData);
}