
import * as BABYLON from "babylonjs";
import { PipelineConfig } from "./Pipeline/types/PipelineConfig";
import { createDefaultPipeline } from "./Pipeline/create/createDefaultPipeline";
import { runCleanPipelines as ACTIONS_runCleanPipelines } from "./actions/run/runCleanPipelines";

export class PipelinesController {
  static instance: PipelinesController = new PipelinesController();
  public pipelines: BABYLON.PostProcessRenderPipeline[] = [];
  public readonly ownedPipelines = new WeakSet<BABYLON.PostProcessRenderPipeline>();

  public createDefault(scene: BABYLON.Scene, config?: PipelineConfig, name: string = "defaultPipeline") {
    const pipeline = createDefaultPipeline(scene, config, name);
    this.pipelines.push(pipeline);
    this.ownedPipelines.add(pipeline);
    this.cleanUp(scene);
    return pipeline;
  }

  public getPipelineByName(
    scene: BABYLON.Scene,
    name: string
  ): BABYLON.DefaultRenderingPipeline | undefined {
    return this.pipelines.find(
      (pipeline): pipeline is BABYLON.DefaultRenderingPipeline =>
        pipeline instanceof BABYLON.DefaultRenderingPipeline &&
        pipeline.name === name &&
        scene.postProcessRenderPipelineManager.supportedPipelines.includes(pipeline)
    );
  }

  public setPipeline(pipeline: BABYLON.PostProcessRenderPipeline): void {
    this.pipelines.push(pipeline);
    this.ownedPipelines.add(pipeline);
  }

  public getAll(): BABYLON.PostProcessRenderPipeline[] {
      return this.pipelines;
    }
  
  
    public loadByIndex(index: number): BABYLON.PostProcessRenderPipeline | undefined {
      const pipeline = this.pipelines[index];
      return pipeline;
    }
  
    public disposeByIndex(index: number): void {
      const pipeline = this.pipelines[index];
      if (pipeline) {
        pipeline.dispose();
        this.pipelines.splice(index, 1);
      }
    }
  
    public disposeAll(): void {
      this.pipelines.forEach(pipeline => pipeline.dispose());
      this.pipelines = [];
    }

    public cleanUp(scene: BABYLON.Scene): void {
      ACTIONS_runCleanPipelines(scene, this.pipelines, this.ownedPipelines);
    }
}
