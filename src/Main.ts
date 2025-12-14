import * as BABYLON from "babylonjs";
import { startEngine } from "@/engine/actions/startEngine";
import { ScenesController } from "@/lib/Scenes/ScenesController";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { CamerasController } from "@/lib/Cameras/CamerasController";
import MainCamera from "@/services/Cameras/MainCamera/MainCamera";
import starsJson from "@/data/stars.json";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import { addStarConfigs } from "./services/Objects/Stars/actions/addStarConfigs";
import { cloudPointsToData } from "./lib/Particles/actions/cloudPointsToData";

window.addEventListener("DOMContentLoaded", async () => {
  const { canvas, engine } = startEngine("renderCanvas");

  const scenesController = new ScenesController();
  const objectsController = new ObjectsController();
  const particlesController = ParticlesController.instance; // ✅ singleton
  const camerasController = new CamerasController();
  const starsController = new StarsController();

  const scene1 = scenesController.createScene(engine, {
    objects: objectsController,
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.1, 1),
  });
  
  const camera = camerasController.addCamera(scene1, canvas, MainCamera);

  // ✅ await Galaxy creation
  const milkyWay = await Galaxy.create(scene1, {
    id: 1,
    name: "Milky Way",
    stars: starsJson
  });
  addStarConfigs(scene1, starsJson, starsController);

  // 🧭 Register scene
  scenesController.addScene(scene1, "Scene1");
  scenesController.setActiveScene("Scene1");

  // 🕹️ Start render loop
  const renderersController = new RenderersController(engine);
    renderersController.addRenderer(
      "slowRenderer",
      scene1,
      (dt) => {
          particlesController.particlesNearCamera = particlesController.getParticlesInRadius(camera.position, 6);
          starsController.manageStars(scene1, milkyWay.stars, particlesController);
      },
      5
  );

  let lastTime = performance.now();

  engine.runRenderLoop(() => {
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;

      renderersController.update(dt);

      renderersController.render("slowRenderer");
  });

});

