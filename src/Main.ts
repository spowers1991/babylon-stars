import * as BABYLON from "babylonjs";
import { startEngine } from "@/engine/actions/startEngine";
import { ScenesController } from "@/lib/Scenes/ScenesController";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { CamerasController } from "./lib/Cameras/CamerasController";
import MainCamera from "./services/Cameras/MainCamera/MainCamera";
import { createStar } from "./services/Objects/Star/actions/createStar";

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

  const config = {
    id: 0,
    name: "Sun",
    diameter: 109, // earth diameters
    textureUrl: "texture1.jpg",
    emissiveColor: new BABYLON.Color3(1, 0.8, 0.5),
    emissiveIntensity: 0.25,
    position: new BABYLON.Vector3(0, 0, 0),
  };

  // 🪐 Add objects
  const star = createStar(scene1, config);

  objectsController.add([star]);

  console.log(objectsController.objects)

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
