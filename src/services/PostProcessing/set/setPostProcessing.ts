
import * as BABYLON from "babylonjs";
import { PipelinesController } from "@/lib/Assets/modules/PostProcessing/Pipelines/PipelinesController";
import { PipelineConfig } from "@/lib/Assets/modules/PostProcessing/Pipelines/Pipeline/types/PipelineConfig";

export function setPostProcessing(scene: BABYLON.Scene, config?: PipelineConfig) {
  const pipeline = PipelinesController.instance.createDefault(scene, config);

  // Attach zoom-reactive post-processing if camera is ArcRotateCamera
  const camera = scene.activeCamera;
  if (camera && camera instanceof BABYLON.ArcRotateCamera && config) {
    //PipelinesController.instance.onZoom(camera, config);
  }

  return pipeline;
}