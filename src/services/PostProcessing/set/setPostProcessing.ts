
import * as BABYLON from "babylonjs";
import { PipelinesController } from "@/lib/Assets/modules/PostProcessing/Pipelines/PipelinesController";
import { PipelineConfig } from "@/lib/Assets/modules/PostProcessing/Pipelines/Pipeline/types/PipelineConfig";
import { CamerasController } from "@/lib/Cameras/CamerasController";

export function setPostProcessing(scene: BABYLON.Scene, config?: PipelineConfig) {
    const camera = scene.activeCamera;
    if(!camera) return;

    const zoomInvert = CamerasController.instance(scene).getZoomLevelClamped(camera, { inverted: true });
    const zoom = CamerasController.instance(scene).getZoomLevelClamped(camera, { inverted: false });
    const pipeline = PipelinesController.instance.getPipelineByName(scene, "defaultPipeline");
    const normalZoom = CamerasController.instance(scene).getZoomLevel(camera, { inverted: false });

    if(!pipeline) return;
/*
    console.log(normalZoom)
    if(normalZoom !== null && zoom !== null) {
        console.log(PipelinesController.instance.pipelines  )
        if (normalZoom < 50){
            pipeline.bloomEnabled = true;
            pipeline.bloomThreshold = 0.25;
            pipeline.bloomWeight = 1;
            pipeline.bloomKernel = 164;
            pipeline.bloomScale = 1.5;
        }
    } else {
        pipeline.bloomEnabled = false;
        pipeline.bloomThreshold = 1;
        pipeline.bloomWeight = 0;
        console.log('zoomed out')
        //PipelinesController.instance.disposeAll();

    }*/
}