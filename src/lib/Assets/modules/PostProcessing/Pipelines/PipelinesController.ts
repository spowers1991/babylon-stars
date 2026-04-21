
import { PipelineConfig } from "./Pipeline/types/PipelineConfig";
import { createDefaultPipeline } from "./Pipeline/create/createDefaultPipeline";

export class PipelinesController {
  static instance: PipelinesController = new PipelinesController();
  pipelines: any[] = [];

  public createDefault(scene: any, config?: PipelineConfig) {
    const pipeline = createDefaultPipeline(scene, config);
    this.pipelines.push(pipeline);
    return pipeline;
  }

  public getPipelineByName(scene: any, name: string) {
    return this.pipelines.find(p => p.name === name && p.scene === scene);
  }

  public setPipeline(pipeline: any) {
    this.pipelines.push(pipeline);
  }

  public getAll(): unknown[] {
      return this.pipelines;
    }
  
  
    public loadByIndex(index: number): unknown {
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
}
