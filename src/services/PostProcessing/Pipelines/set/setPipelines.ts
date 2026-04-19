import { PipelinesController } from "@/lib/Assets/modules/PostProcessing/Pipelines/PipelinesController";

export function setPipeline(scene: any) {
  const pipelinesController = PipelinesController.instance.createDefault(scene);
  PipelinesController.instance.setPipeline(pipelinesController);
}   