
import * as BABYLON from "babylonjs";
import { PipelinesController } from "@/lib/Assets/modules/PostProcessing/Pipelines/PipelinesController";
import { PipelineConfig } from "@/lib/Assets/modules/PostProcessing/Pipelines/Pipeline/types/PipelineConfig";
import { CamerasController } from "@/lib/Cameras/CamerasController";
import { getBloomWeight } from "../get/getBloomWeight";

const BLOOM_LERP_SPEED = 8;

function getLerpAlpha(scene: BABYLON.Scene, speed: number): number {
    const dtSeconds = scene.getEngine().getDeltaTime() / 1000;
    return 1 - Math.exp(-speed * dtSeconds);
}

export function setPostProcessing(scene: BABYLON.Scene, config?: PipelineConfig) {
    if(!scene.activeCamera) return;

    const pipeline = PipelinesController.instance.getPipelineByName(scene, "defaultPipeline");
    const normalZoom = CamerasController.instance(scene).getActiveCamera()?.getZoomLevel({ inverted: false }) ?? null;

    if(!pipeline) return;

    if (normalZoom !== null) {
        const targetBloomWeight = normalZoom < 2000 ? getBloomWeight(normalZoom) : 0;
        const lerpAlpha = getLerpAlpha(scene, BLOOM_LERP_SPEED);

        pipeline.bloomWeight = BABYLON.Scalar.Lerp(
            pipeline.bloomWeight,
            targetBloomWeight,
            lerpAlpha,
        );

        // Keep bloom active while fading out to avoid hard cutoffs.
        pipeline.bloomEnabled = targetBloomWeight > 0.001 || pipeline.bloomWeight > 0.001;
        pipeline.fxaaEnabled = normalZoom < 100;
        return;
    }

    pipeline.bloomEnabled = false;
    pipeline.fxaaEnabled = false;
}