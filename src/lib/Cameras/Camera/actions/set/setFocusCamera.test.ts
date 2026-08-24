import assert from "node:assert/strict";
import * as BABYLON from "babylonjs";
import { setFocusCamera } from "./setFocusCamera";

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

{
  const { scene, camera } = createScene();
  const startingRadius = camera.radius;

  setFocusCamera(camera, new BABYLON.Vector3(10, 0, 0));

  scene.render();

  assert.equal(camera.radius, startingRadius, "focus should preserve the current radius");
  assert.notDeepEqual(camera.target.asArray(), [0, 0, 0], "focus should start moving toward the new target");
  assert.notDeepEqual(camera.target.asArray(), [10, 0, 0], "focus should transition smoothly instead of jumping immediately");

  scene.render();
  scene.render();

  assert.deepEqual(camera.target.asArray(), [10, 0, 0], "focus should finish at the requested target");
  assert.equal(scene.activeCamera, camera);
}

{
  const { scene, camera } = createScene();
  const closerTarget = BABYLON.Vector3.Lerp(camera.globalPosition, camera.target, 0.5);
  const startingRadius = camera.radius;

  setFocusCamera(camera, closerTarget);

  scene.render();
  scene.render();
  scene.render();

  assert.equal(camera.radius, startingRadius, "focus should not zoom out or in when retargeting");
  assert.deepEqual(camera.target.asArray(), closerTarget.asArray());
}

console.log("focus camera test passed");
