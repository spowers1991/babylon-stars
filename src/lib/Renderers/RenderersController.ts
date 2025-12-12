// src/lib/Render/RenderController.ts
import * as BABYLON from "babylonjs";
import { ScenesController } from "@/lib/Scenes/ScenesController";
import { ObjectsController } from "@/lib/Objects/ObjectsController";

// RenderersController.ts
export class RenderersController {
    private engine: BABYLON.Engine;
    private scenes: Map<string, BABYLON.Scene> = new Map();
    private renderers: Map<string, {
        scene: BABYLON.Scene,
        tick: (dt: number) => void,
        fpsCap: number,
        accumulator: number
    }> = new Map();

    constructor(engine: BABYLON.Engine) {
        this.engine = engine;
    }

    /**
     * Register a new renderer
     */
    addRenderer(
        name: string,
        scene: BABYLON.Scene,
        tick: (dt: number) => void,
        fpsCap: number = 60
    ) {
        this.renderers.set(name, {
            scene,
            tick,
            fpsCap,
            accumulator: 0
        });

        this.scenes.set(name, scene);
    }

    /**
     * Remove a renderer
     */
    removeRenderer(name: string) {
        this.renderers.delete(name);
        this.scenes.delete(name);
    }

    /**
     * Main update loop: call once in your engine runRenderLoop()
     */
    update(deltaTimeMs: number) {
        for (const [name, r] of this.renderers) {
            const frameTime = 1000 / r.fpsCap;
            r.accumulator += deltaTimeMs;

            // Throttle based on FPS cap
            if (r.accumulator >= frameTime) {
                r.tick(r.accumulator);
                r.accumulator = 0;
            }
        }
    }

    /**
     * Ask a renderer to draw its scene
     */
    render(name: string) {
        const r = this.renderers.get(name);
        if (!r) return;
        this.engine.scenes = [r.scene]; // temporary scene override
        r.scene.render();
    }
}
