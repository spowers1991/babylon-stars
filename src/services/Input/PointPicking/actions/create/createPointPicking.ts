import * as BABYLON from "babylonjs";
import { PointPickingController } from "@/lib/Input/PointPicking/PointPickingController";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import { StarConfig } from "@/services/Objects/Stars/Star/types/StarConfig";

export function createPointPicking(scene : BABYLON.Scene, galaxy: Galaxy) {
  const pickingController = PointPickingController.instance(scene);
  const starsController = StarsController.instance(scene);

  pickingController.setCamera(scene.activeCamera!);

  pickingController.createPickingEvents(
    /* element: */ galaxy,
    /* options: */ { pickRadius: 25 },
    /* matchedConfigsFromPick: */ galaxy.starsConfigs,
    /* setActiveConfigs: */ (matchedConfigsFromPick) => {
      starsController.activeStarsConfigs = matchedConfigsFromPick as StarConfig[];
    }
  );
}
