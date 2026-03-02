import * as BABYLON from "babylonjs";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { PointPickingController } from "../../../../PointPickingController";

export function setNearbyDataSPS(
  scene: BABYLON.Scene,
  configs: any[],
  setData: (data: any[]) => void
) {

  const particlesController = ParticlesController.instance(scene);
  const pickingController = PointPickingController.instance(scene);

  const nearbyData = particlesController.createObjectsArrayFromSPS(
    pickingController.closestPicksSPS,
    configs,
  );  

  setData(nearbyData);
}