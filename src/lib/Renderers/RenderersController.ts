// src/lib/Render/RenderController.ts
import * as BABYLON from "babylonjs";
import { ScenesController } from "@/lib/Scenes/ScenesController";
import { ObjectsController } from "@/lib/Objects/ObjectsController";

export class RenderersController {
  private engine: BABYLON.Engine;
  private scenes: ScenesController;
  private objects?: ObjectsController;
  private beforeRender?: (scene: BABYLON.Scene) => void;

  constructor(engine: BABYLON.Engine, scenes: ScenesController, objects?: ObjectsController) {
    this.engine = engine;
    this.scenes = scenes;
    this.objects = objects;
  }

  /**
   * Optional hook to run custom code before render.
   */
  public onBeforeRender(callback: (scene: BABYLON.Scene) => void): void {
    this.beforeRender = callback;
  }

  /**
   * Start the render loop.
   */
  public start(): void {
    this.engine.runRenderLoop(() => {
      const scene = this.scenes.getActiveScene();
      if (!scene) return;

      // Run optional callback before rendering
      this.beforeRender?.(scene);

      // Update game objects (animations, rotations, etc.)
      this.objects?.update(this.engine.getDeltaTime());

      // Render the active scene
      scene.render();
    });

    // Resize handling
    window.addEventListener("resize", () => this.engine.resize());
  }

  /**
   * Stop rendering (pause the loop).
   */
  public stop(): void {
    this.engine.stopRenderLoop();
  }
}
