
import * as BABYLON from "babylonjs";
import { PipelinesController } from "@/lib/Assets/modules/PostProcessing/Pipelines/PipelinesController";
import { PipelineConfig } from "@/lib/Assets/modules/PostProcessing/Pipelines/Pipeline/types/PipelineConfig";

export function createPostProcessing(scene: BABYLON.Scene, config?: PipelineConfig) {
  
  const pipeline = PipelinesController.instance.createDefault(scene, config);

  return pipeline;
}