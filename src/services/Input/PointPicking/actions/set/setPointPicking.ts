import * as BABYLON from "babylonjs";
import { PointPickingController } from "@/lib/Input/PointPicking/PointPickingController";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarsController } from "@/services/Objects/Stars/StarsController";

export function setPointPicking(scene : BABYLON.Scene, galaxy: Galaxy) {
  const pickingController = PointPickingController.instance(scene);

  pickingController.setCamera(scene.activeCamera!);

  const starsController = StarsController.instance(scene);

  pickingController.setupPickingEvents(galaxy, (data) => {
    starsController.stars = data;
  });

}
