import * as BABYLON from "babylonjs";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { Renderers as Render} from "../../Renderers";

export function runRenders(engine: BABYLON.Engine, scene: BABYLON.Scene) {
    RenderersController.runRenderers(
        engine,
        scene,
        [   
            //Render.camera(scene),
            // 500ms interval for updating the stars, which is sufficient for most cases and helps to reduce CPU usage
            Render.stars(scene),
            // 50ms interval for updating the SPS particles, which is a good balance between performance and visual quality
            Render.particles(scene),
            Render.postProcessing(scene),
        ]
    );
};