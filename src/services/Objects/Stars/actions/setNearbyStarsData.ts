import * as BABYLON from "babylonjs";
import { StarsController } from "../StarsController";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { PointPickingController } from "@/lib/Input/PointPicking/PointPickingController";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";

export function setNearbyStarsData(
  scene: BABYLON.Scene,
  galaxy: Galaxy
) {
  const starsController = StarsController.instance(scene);
  const particlesController = ParticlesController.instance(scene);
  const pickingController = PointPickingController.instance(scene);

  starsController.stars = particlesController.particlesToDataPCS(
    pickingController.closestPicksPCS,
    galaxy.starsData
  );
}
