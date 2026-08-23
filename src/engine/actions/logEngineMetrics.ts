import * as BABYLON from "babylonjs";

/**
 * Logs key engine performance metrics to the console.
 * @param engine The Babylon.js engine
 * @param scene  The active Babylon.js scene
 */
export function logEngineMetrics(engine: BABYLON.Engine, scene: BABYLON.Scene) {
  console.log("[Engine Metrics]", {
    deltaTimeMs: engine.getDeltaTime(),
    fps: engine.getFps().toFixed(2),
    animationRatio: scene.getAnimationRatio().toFixed(4),
  });
}
