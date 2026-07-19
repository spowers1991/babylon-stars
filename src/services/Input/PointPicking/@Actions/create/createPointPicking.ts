import * as BABYLON from "babylonjs";
import { PointPickingController } from "@/lib/Input/PointPicking/PointPickingController";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import { StarConfig } from "@/services/Objects/Stars/Star/types/StarConfig";
import { AssetsController } from "@/lib/Assets/AssetsController";

export function createPointPicking(scene : BABYLON.Scene, galaxy: Galaxy) {
  const pickingController = PointPickingController.instance(scene);
  const starsController = StarsController.instance(scene);

  const meshesController = AssetsController.instance.meshes;

  pickingController.setCamera(scene.activeCamera!);

  pickingController.setPointerObservable({
    element: galaxy as Galaxy,
    options: { pickRadius: 15 },
    data: { configs: galaxy.starsConfigs },
    setActiveData: (matchedConfigsFromPick: any[]) => {
      starsController.activeStarsConfigs = matchedConfigsFromPick as StarConfig[];
      starsController.activeObject = starsController.activeStarsConfigs[0] || null;
      
      meshesController.setMeshesConfigs(starsController.activeStarsConfigs);
      meshesController.setMeshPool(scene);
    }
  });
}
