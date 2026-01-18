// src/lib/Render/RenderController.ts
import * as BABYLON from "babylonjs";

export class RenderersController {
    private static _instance: RenderersController | null = null;
    private engine: BABYLON.Engine;
    private scenes: Map<string, BABYLON.Scene> = new Map();
    private renderers: Map<string, {
        scene: BABYLON.Scene;
        tick: (dt: number) => void;
        fpsCap: number;
        accumulator: number;
    }> = new Map();

    private constructor(engine: BABYLON.Engine) {
        this.engine = engine;
    }

    static instance(engine?: BABYLON.Engine): RenderersController {
        if (!RenderersController._instance) {
            if (!engine) throw new Error("RenderersController not initialized.");
            RenderersController._instance = new RenderersController(engine);
        }
        return RenderersController._instance;
    }

    addRenderer(name: string, scene: BABYLON.Scene, tick: (dt: number) => void, fpsCap: number = 60) {
        this.renderers.set(name, { scene, tick, fpsCap, accumulator: 0 });
        this.scenes.set(name, scene);
    }

    removeRenderer(name: string) {
        this.renderers.delete(name);
        this.scenes.delete(name);
    }

    update(deltaTimeMs: number) {
        for (const r of this.renderers.values()) {
            const frameTime = 1000 / r.fpsCap;
            r.accumulator += deltaTimeMs;

            // Improved FPS cap: handle multiple missed frames
            while (r.accumulator >= frameTime) {
                r.tick(frameTime);
                r.accumulator -= frameTime;
            }
        }
    }

    render(name: string) {
        const r = this.renderers.get(name);
        if (!r) return;
        r.scene.render();
    }

    // ✅ Add this method
    renderAll() {
        for (const r of this.renderers.values()) {
            r.scene.render();
        }
    }
}
