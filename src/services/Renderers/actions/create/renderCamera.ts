import * as BABYLON from "babylonjs";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { GalaxiesController } from "@/services/Objects/Galaxies/GalaxiesController";
import { StarsController } from "@/services/Objects/Stars/StarsController";


export function renderCamera(scene: BABYLON.Scene) {
  const galaxiesController = GalaxiesController.instance(scene);
  const starsController = StarsController.instance(scene);

  return () => RenderersController.stepUpdate({
    id: "cameraUpdate",
    name: "Camera Update",
    interval: 500,
    step: () => {
        galaxiesController.galaxies.forEach(galaxy => {
            console.log(starsController.activeStarConfig)
        });
    }
  });
}