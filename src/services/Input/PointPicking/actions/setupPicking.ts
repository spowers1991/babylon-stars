import { PointPickingController } from "@/lib/Input/PointPicking/PointPickingController";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarsController } from "@/services/Objects/Stars/StarsController";

export function setupPicking(galaxy: Galaxy) {
  const pickingController = PointPickingController.instance(galaxy.scene);
  pickingController.setCamera(galaxy.scene.activeCamera!);
  const starsController = StarsController.instance(galaxy.scene);
  pickingController.setupPickingEvents(galaxy, (data) => {
    starsController.stars = data;
  });
  return pickingController
}
