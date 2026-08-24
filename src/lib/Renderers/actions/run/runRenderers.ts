import * as BABYLON from "babylonjs";

/**
 * Runs the provided functions in each engine render loop tick.
 * @param engine The Babylon.js engine
 * @param fns Array of functions to run each frame
 */
export function runRenderers(engine: BABYLON.Engine, scene : BABYLON.Scene, fns: Array<(deltaMs: number) => void>) {
  engine.runRenderLoop(() => {
    const deltaMs = engine.getDeltaTime();

    for (const fn of fns) {
      fn(deltaMs);
    }
    scene.render();
  });
}
