import * as BABYLON from "babylonjs";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { Render } from "../../Render";

export function setRenderers(engine: BABYLON.Engine, scene: BABYLON.Scene) {
    RenderersController.runRenders(
        engine,
        scene,
        [
            Render.stars(scene),
            Render.particles(scene),
        ]
    );
};