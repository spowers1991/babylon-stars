import * as BABYLON from "babylonjs";
import { startEngine } from "@/engine/actions/startEngine";
import { ScenesController } from "@/lib/Scenes/ScenesController";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { CamerasController } from "./lib/Cameras/CamerasController";
import MainCamera from "./services/Cameras/MainCamera/MainCamera";
import { createStarPointMap } from "./services/Objects/Stars/actions/createStarPointCloud";
import stars from "@/data/stars.json";
import { createStars } from "./services/Objects/Stars/actions/createStars";

window.addEventListener("DOMContentLoaded", () => {
  const { canvas, engine } = startEngine("renderCanvas");

  const scenesController = new ScenesController();
  const objectsController = new ObjectsController();
  const camerasController = new CamerasController();

  const scene1 = scenesController.createScene(engine, {
    objects: objectsController,
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.1, 1),
  });
  
  const camera = camerasController.addCamera(
    scene1,
    canvas,
    MainCamera
  );

  createStarPointMap(scene1, stars)

  createStars(scene1, stars);

  // 🧭 Register scene
  scenesController.addScene(scene1, "Scene1");
  scenesController.setActiveScene("Scene1");

  // 🕹️ Start render loop
  const renderersController = new RenderersController(engine, scenesController, objectsController);
  renderersController.onBeforeRender(scene => {
    // You can do per-frame logic here
  });
  renderersController.start();
});
