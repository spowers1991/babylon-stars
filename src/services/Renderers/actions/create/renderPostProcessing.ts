import * as BABYLON from "babylonjs";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { setPostProcessing } from "@/services/PostProcessing/set/setPostProcessing";

export function renderPostProcessing(scene: BABYLON.Scene) {
  return () => RenderersController.stepUpdate({
    id: "postProcessingUpdate",
    name: "Post Processing Update",
    interval: 100,
    step: () => {
        setPostProcessing(scene);
    }
  });
}