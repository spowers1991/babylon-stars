import * as BABYLON from "babylonjs";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import { AssetsController } from "@/lib/Assets/AssetsController";

export function renderStars(scene: BABYLON.Scene) {
  const starsController = StarsController.instance(scene);
  const meshesController = AssetsController.instance.meshes;

  return () => RenderersController.stepUpdate({
    id: "starUpdate",
    name: "Star Update",
    interval: 500,
    step: () => {
      starsController.updateStars(starsController.activeStarsConfigs);
      console.log(meshesController.meshes, meshesController.meshPool, scene.meshes);
    },
  });
}
