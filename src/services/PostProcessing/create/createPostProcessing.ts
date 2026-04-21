
import * as BABYLON from "babylonjs";
import { PipelinesController } from "@/lib/Assets/modules/PostProcessing/Pipelines/PipelinesController";
import { PipelineConfig } from "@/lib/Assets/modules/PostProcessing/Pipelines/Pipeline/types/PipelineConfig";

export function createPostProcessing(scene: BABYLON.Scene) {

  const config = {
    bloomEnabled: true,
    bloomThreshold: 0.1,
    bloomWeight: 0.1,
    bloomKernel: 164,
    bloomScale: 1.5,
    fxaaEnabled: true,
  } as PipelineConfig;
  
  const pipeline = PipelinesController.instance.createDefault(scene, config);

  return pipeline;
}