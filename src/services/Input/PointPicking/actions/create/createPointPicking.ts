import * as BABYLON from "babylonjs";
import { PointPickingController } from "@/lib/Input/PointPicking/PointPickingController";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import { StarConfig } from "@/services/Objects/Stars/Star/types/StarConfig";
import { AssetsController } from "@/lib/Assets/AssetsController";
import { setPickFocus } from "@/lib/Input/PointPicking/actions/set/setPickFocus";

export function createPointPicking(scene : BABYLON.Scene, galaxy: Galaxy) {
  const pickingController = PointPickingController.instance(scene);
  const starsController = StarsController.instance(scene);

  const meshesController = AssetsController.instance.meshes;

  pickingController.setCamera(scene.activeCamera!);

  pickingController.setPointerObservable({
    element: galaxy as Galaxy,
    options: { pickRadius: 150 },
    data: { configs: galaxy.starsConfigs },
    setActiveData: (matchedConfigs: any[]) => {
      starsController.activeStarsConfigs = matchedConfigs as StarConfig[];

      starsController.activeStarConfig = starsController.activeStarsConfigs[0] || null;
      starsController.activeObject = starsController.activeStarsConfigs[0] || null;
      
      meshesController.setMeshesConfigs(starsController.activeStarsConfigs);
      meshesController.setMeshPool(scene);

      const pickedStar = pickingController.closestPickSPS;
      if (pickedStar) {
        setPickFocus(scene.activeCamera!, pickedStar);
        console.log("Picked Star:", starsController.activeStar);
      }

    }
  });
}
