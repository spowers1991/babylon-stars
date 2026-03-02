import * as BABYLON from "babylonjs";

/**
 * Runs the provided functions in each engine render loop tick.
 * @param engine The Babylon.js engine
 * @param fns Array of functions to run each frame
 */
export function runRenders(engine: BABYLON.Engine, scene : BABYLON.Scene, fns: Array<() => void>) {
  engine.runRenderLoop(() => {
    for (const fn of fns) {
      fn();
    }
    scene.render();
  });
}
