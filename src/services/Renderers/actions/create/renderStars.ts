import * as BABYLON from "babylonjs";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { StarsController } from "@/services/Objects/Stars/StarsController";

export function renderStars(scene: BABYLON.Scene) {
  const starsController = StarsController.instance(scene);

  return () => RenderersController.stepUpdate({
    id: "starUpdate",
    name: "Star Update",
    interval: 500,
    step: () => {
      starsController.updateStars(starsController.activeStarsConfigs);
      //console.log(starsController.getObjectsToRender());
    },
  });
}
