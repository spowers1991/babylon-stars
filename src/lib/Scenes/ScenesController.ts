// src/lib/Scenes/ScenesController.ts
import * as BABYLON from "babylonjs";
import { SceneConfig } from "./types/SceneConfig";
import { SceneEntry } from "./types/SceneEntry";

export class ScenesController {
  public scenes: SceneEntry[] = [];
  private activeScene?: BABYLON.Scene;

  /**
   * Create a new Babylon.js scene.
   */
  public createScene(engine: BABYLON.Engine, config?: SceneConfig): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);

    if (config?.clearColor) {
      scene.clearColor = config.clearColor;
    }

    if (config?.collisions) {
      scene.collisionsEnabled = true;
    }

    if (config?.gravity) {
      // scene.gravity = config.gravity;
    }

    if (config?.physics) {
      // scene.enablePhysics(config.physics.gravity, config.physics.plugin);
    }

    return scene;
  }

  /**
   * Register a scene with a name.
   */
  public addScene(scene: BABYLON.Scene, name: string): void {
    this.scenes.push({ name, scene });
  }

  /**
   * Set a scene as the active one (by name or index).
   */
  public setActiveScene(identifier: string | number): void {
    if (typeof identifier === "number") {
      this.activeScene = this.scenes[identifier]?.scene;
    } else {
      const found = this.scenes.find(s => s.name === identifier);
      this.activeScene = found?.scene;
    }

    if (!this.activeScene) {
      console.warn(`[ScenesController] Scene "${identifier}" not found.`);
    }
  }

  /**
   * Get the currently active scene.
   */
  public getActiveScene(): BABYLON.Scene | undefined {
    return this.activeScene;
  }

  /**
   * Start the Babylon render loop for the active scene.
   */
  public run(engine: BABYLON.Engine, beforeRender?: (scene: BABYLON.Scene) => void): void {
    if (!this.activeScene) {
      console.error("[ScenesController] No active scene set. Call setActiveScene() first.");
      return;
    }

    engine.runRenderLoop(() => {
      if (this.activeScene) {
        beforeRender?.(this.activeScene);
        this.activeScene.render();
      }
    });

    window.addEventListener("resize", () => engine.resize());
  }

  /**
   * List all scenes.
   */
  public getScenes(): BABYLON.Scene[] {
    return this.scenes.map(s => s.scene);
  }

  /**
   * Dispose a scene by index.
   */
  public disposeScene(index: number): void {
    const entry = this.scenes[index];
    if (entry) {
      entry.scene.dispose();
      this.scenes.splice(index, 1);
    }
  }
}
