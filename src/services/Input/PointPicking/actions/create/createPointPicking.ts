import * as BABYLON from "babylonjs";
import { PointPickingController } from "@/lib/Input/PointPicking/PointPickingController";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import { StarConfig } from "@/services/Objects/Stars/Star/types/StarConfig";
import { AssetsController } from "@/lib/Assets/AssetsController";
import { CamerasController } from "@/lib/Cameras/CamerasController";
import { MAX_RENDER_OBJECTS } from "@/lib/Objects/actions/set/setObjectsToRender";

export function createPointPicking(scene : BABYLON.Scene, galaxy: Galaxy) {
  const camerasController = CamerasController.instance(scene);
  const pickingController = PointPickingController.instance(scene);
  const starsController = StarsController.instance(scene);

  const meshesController = AssetsController.instance.meshes;

  const activeCamera = camerasController.getActiveCamera();
  
  pickingController.setCamera(activeCamera?.camera!);

  pickingController.setPointerObservable({
    element: galaxy as Galaxy,
    options: { pickRadius: 1000 },
    data: { configs: galaxy.starsConfigs },
    setActiveData: (matchedConfigs: any[]) => {
      starsController.activeStarsConfigs = matchedConfigs as StarConfig[];

      meshesController.setMeshesConfigs(starsController.activeStarsConfigs.slice(0, MAX_RENDER_OBJECTS));
      meshesController.setMeshPool(scene, false);
      AssetsController.instance.cleanUp(scene);
      starsController.updateStars(starsController.activeStarsConfigs);

      const pickedStar = pickingController.closestPickSPS;
      if (pickedStar) {
        activeCamera?.focusOn(pickedStar.position, 2);
      }

    }
  });
}
