import * as BABYLON from "babylonjs";

export function runCleanPipelines(
  scene: BABYLON.Scene,
  pipelinePool: BABYLON.PostProcessRenderPipeline[],
  ownedPipelines: WeakSet<BABYLON.PostProcessRenderPipeline>
): void {
  scene.postProcessRenderPipelineManager.supportedPipelines
    .slice()
    .forEach((pipeline) => {
      if (ownedPipelines.has(pipeline) && !pipelinePool.includes(pipeline)) {
        pipeline.dispose();
      }
    });
}
