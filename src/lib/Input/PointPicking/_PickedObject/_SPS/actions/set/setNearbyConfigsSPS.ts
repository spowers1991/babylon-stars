import * as BABYLON from "babylonjs";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { PointPickingController } from "../../../../PointPickingController";

export function setNearbyConfigsSPS(
  scene: BABYLON.Scene,
  setActiveConfigsFromPick: any[],
  setActiveConfigs: (configs: any[]) => void
) {

  const particlesController = ParticlesController.instance(scene);
  const pickingController = PointPickingController.instance(scene);

  const nearbyConfigs = particlesController.createConfigsArrayFromSPS(
    pickingController.closestPicksSPS,
    setActiveConfigsFromPick,
  );
  
  setActiveConfigs(nearbyConfigs);
}