import * as BABYLON from "babylonjs";
import { PointPickingController } from "@/lib/Input/PointPicking/PointPickingController";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarsController } from "@/services/Objects/Stars/StarsController";

export function setPointPicking(scene : BABYLON.Scene, galaxy: Galaxy) {
  const pickingController = PointPickingController.instance(scene);
  const starsController = StarsController.instance(scene);

  pickingController.setCamera(scene.activeCamera!);
  
  pickingController.setupPickingEvents(galaxy, starsController.starsConfigs, (data) => {
    starsController.activeStarsData = data;
  });

}
