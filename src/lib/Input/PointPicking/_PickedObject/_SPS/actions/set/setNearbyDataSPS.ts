import * as BABYLON from "babylonjs";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { PointPickingController } from "../../../../PointPickingController";

export function setNearbyDataSPS(
  scene: BABYLON.Scene,
  configs: any[],
  setConfigs: (configs: any[]) => void
) {

  const particlesController = ParticlesController.instance(scene);
  const pickingController = PointPickingController.instance(scene);

  const nearbyConfigs = particlesController.createConfigsArrayFromSPS(
    pickingController.closestPicksSPS,
    configs,
  );  

  setConfigs(nearbyConfigs);
}