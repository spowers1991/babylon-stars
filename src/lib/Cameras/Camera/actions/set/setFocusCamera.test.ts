import assert from "node:assert/strict";
import * as BABYLON from "babylonjs";
import { CamerasController } from "../../../CamerasController";
import {
  ACTIONS_onBeforeRenderFocusTransition,
  FocusTransitionState,
} from "../run/onBeforeRenderFocusTransition";

function createScene() {
  const engine = new BABYLON.NullEngine();
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 4,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );

  scene.activeCamera = camera;
  engine.getDeltaTime = () => 100;

  return { engine, scene, camera };
}

// Test ACTIONS_onBeforeRenderFocusTransition — frame step moves target toward end
{
  const { camera } = createScene();
  const startRadius = camera.radius;

  const state: FocusTransitionState = {
    elapsedSeconds: 0,
    durationSeconds: 0.25,
    startRadius,
    startTarget: camera.target.clone(),
    endTarget: new BABYLON.Vector3(10, 0, 0),
    preventZoomOutOnFocus: false,
  };

  const result1 = ACTIONS_onBeforeRenderFocusTransition(camera, 0.1, state);
  assert.equal(result1.done, false, "should not be done after first step");
  assert.equal(camera.radius, startRadius, "radius should be preserved after step");
  assert.notDeepEqual(camera.target.asArray(), [0, 0, 0], "target should start moving");
  assert.notDeepEqual(camera.target.asArray(), [10, 0, 0], "target should not jump immediately");

  const result2 = ACTIONS_onBeforeRenderFocusTransition(camera, 0.1, result1.nextState);
  const result3 = ACTIONS_onBeforeRenderFocusTransition(camera, 0.1, result2.nextState);

  assert.equal(result3.done, true, "should be done after enough time");
  assert.deepEqual(camera.target.asArray(), [10, 0, 0], "focus should finish at the requested target");
}

// Test preventZoomOutOnFocus clamps radius
{
  const { camera } = createScene();
  const startRadius = camera.radius;

  const state: FocusTransitionState = {
    elapsedSeconds: 0,
    durationSeconds: 0.25,
    startRadius,
    startTarget: camera.target.clone(),
    endTarget: new BABYLON.Vector3(0, 0, 5),
    preventZoomOutOnFocus: true,
  };

  // Simulate Babylon zooming out during focusOn
  camera.radius = startRadius + 5;

  ACTIONS_onBeforeRenderFocusTransition(camera, 0.1, state);
  assert.equal(camera.radius, startRadius, "preventZoomOutOnFocus should clamp radius back");
}

// Test CamerasController.pickFocus drives transitions via onBeforeRenderObservable
{
  const { scene, camera } = createScene();
  const startingRadius = camera.radius;
  const controller = CamerasController.instance(scene);

  controller.pickFocus(camera, new BABYLON.Vector3(10, 0, 0));

  scene.render();

  assert.equal(camera.radius, startingRadius, "focus should preserve the current radius");
  assert.notDeepEqual(camera.target.asArray(), [0, 0, 0], "focus should start moving toward the new target");
  assert.notDeepEqual(camera.target.asArray(), [10, 0, 0], "focus should transition smoothly instead of jumping immediately");

  scene.render();
  scene.render();

  assert.deepEqual(camera.target.asArray(), [10, 0, 0], "focus should finish at the requested target");
  assert.equal(scene.activeCamera, camera);
}

// Test that retargeting a closer point does not zoom camera
{
  const { scene, camera } = createScene();
  const closerTarget = BABYLON.Vector3.Lerp(camera.globalPosition, camera.target, 0.5);
  const startingRadius = camera.radius;
  const controller = CamerasController.instance(scene);

  controller.pickFocus(camera, closerTarget);

  scene.render();
  scene.render();
  scene.render();

  assert.equal(camera.radius, startingRadius, "focus should not zoom out or in when retargeting");
  assert.deepEqual(camera.target.asArray(), closerTarget.asArray());
}

console.log("focus camera test passed");
