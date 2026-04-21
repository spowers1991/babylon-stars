
import * as BABYLON from "babylonjs";
import { PipelinesController } from "@/lib/Assets/modules/PostProcessing/Pipelines/PipelinesController";
import { PipelineConfig } from "@/lib/Assets/modules/PostProcessing/Pipelines/Pipeline/types/PipelineConfig";
import { CamerasController } from "@/lib/Cameras/CamerasController";

export function setPostProcessing(scene: BABYLON.Scene, config?: PipelineConfig) {
    const camera = scene.activeCamera;
    if(!camera) return;

    const pipeline = PipelinesController.instance.getPipelineByName(scene, "defaultPipeline");
    const normalZoom = CamerasController.instance(scene).getZoomLevel(camera, { inverted: false });

    if(!pipeline) return;

    if (normalZoom !== null) {
        pipeline.bloomEnabled = normalZoom < 300;
        pipeline.fxaaEnabled = normalZoom < 100;

        return;
    }

    pipeline.bloomEnabled = false;
    pipeline.fxaaEnabled = false;
}