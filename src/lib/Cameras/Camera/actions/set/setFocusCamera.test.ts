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
  engine.getDeltaTime = () => 500;

  return { scene, camera };
}

{
  const { scene, camera } = createScene();
  camera.metadata = { focus: { preventZoomOut: true } };

  setFocusCamera(camera, new BABYLON.Vector3(10, 0, 0));
  scene.render();

  assert.equal(camera.radius, 10, "focus should keep the same radius when the new target is not closer than the current focus");
  assert.notEqual(camera.target.x, 0, "focus should still move the camera target");
}

{
  const { scene, camera } = createScene();
  camera.metadata = { focus: { preventZoomOut: true } };
  const closerTarget = BABYLON.Vector3.Lerp(camera.globalPosition, camera.target, 0.5);

  setFocusCamera(camera, closerTarget);
  scene.render();

  assert.ok(camera.radius < 10, "focus should move closer when the clicked target is already closer to the camera");
}

{
  const { scene, camera } = createScene();
  const closerTarget = BABYLON.Vector3.Lerp(camera.globalPosition, camera.target, 0.5);

  setFocusCamera(camera, closerTarget);
  scene.render();

  assert.equal(camera.radius, 10, "focus should preserve the current behavior when preventZoomOut is not enabled");
}

console.log("focus camera test passed");
