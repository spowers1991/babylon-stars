import * as BABYLON from "babylonjs";
import { PipelineConfig } from "../types/PipelineConfig";

/**
 * Create and return a configured DefaultRenderingPipeline with bloom and FXAA.
 */
export function createDefaultPipeline(scene: BABYLON.Scene, config?: PipelineConfig, name: string = "defaultPipeline"): BABYLON.DefaultRenderingPipeline {
  const pipeline = new BABYLON.DefaultRenderingPipeline(
    name,
    true,
    scene,
    [scene.activeCamera as any]
  );
  pipeline.bloomEnabled = config?.bloomEnabled ?? true;
  pipeline.bloomThreshold = config?.bloomThreshold ?? 0.25;
  pipeline.bloomWeight = config?.bloomWeight ?? 0.86;
  pipeline.bloomKernel = config?.bloomKernel ?? 164;
  pipeline.bloomScale = config?.bloomScale ?? 0.1;
  pipeline.fxaaEnabled = config?.fxaaEnabled ?? false;
  return pipeline;
}
