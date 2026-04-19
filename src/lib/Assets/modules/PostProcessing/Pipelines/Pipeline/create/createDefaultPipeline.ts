import * as BABYLON from "babylonjs";
import { PipelineConfig } from "../types/PipelineConfig";

/**
 * Create and return a configured DefaultRenderingPipeline with bloom and FXAA.
 */
export function createDefaultPipeline(scene: BABYLON.Scene, config?: PipelineConfig): BABYLON.DefaultRenderingPipeline {
  const pipeline = new BABYLON.DefaultRenderingPipeline(
    config?.name || "defaultPipeline",
    true,
    scene,
    [scene.activeCamera as any]
  );
  pipeline.bloomEnabled = config?.bloomEnabled ?? true;
  pipeline.bloomThreshold = config?.bloomThreshold ?? 0.25;
  pipeline.bloomWeight = config?.bloomWeight ?? 0.86;
  pipeline.bloomKernel = config?.bloomKernel ?? 164;
  pipeline.bloomScale = config?.bloomScale ?? 0.1;
  pipeline.fxaaEnabled = true;
  return pipeline;
}
