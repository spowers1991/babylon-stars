import * as BABYLON from "babylonjs";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { GalaxiesController } from "@/services/Objects/Galaxies/GalaxiesController";


export function renderCamera(scene: BABYLON.Scene) {
  const galaxiesController = GalaxiesController.instance(scene);

  return () => RenderersController.stepUpdate({
    id: "cameraUpdate",
    name: "Camera Update",
    interval: 500,
    step: () => {
        galaxiesController.galaxies.forEach(galaxy => {
            console.log(galaxy)
        });
    }
  });
}