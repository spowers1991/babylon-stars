import * as BABYLON from "babylonjs";
import { startEngine } from "@/engine/actions/startEngine";
import { ScenesController } from "@/lib/Scenes/ScenesController";
import { ObjectsController } from "@/lib/Objects/ObjectsController";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { CamerasController } from "@/lib/Cameras/CamerasController";
import { PointPickingController } from "@/lib/Input/PointPicking/PointPickingController";
import MainCamera from "@/services/Cameras/MainCamera/MainCamera";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import { createStarConfigs } from "./services/Objects/Stars/actions/createStarConfigs";
import starsJson from "@/data/stars.json";


window.addEventListener("DOMContentLoaded", async () => {
  const { canvas, engine } = startEngine("renderCanvas");

  const scenesController = new ScenesController();
  const objectsController = new ObjectsController();
  const particlesController = ParticlesController.instance; 
  const camerasController = new CamerasController();
  const starsController = new StarsController();

  const scene1 = scenesController.createScene(engine, {
    objects: objectsController,
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.1, 1),
  });
  
  const camera = camerasController.addCamera(scene1, canvas, MainCamera) as BABYLON.Camera;

  // ✅ await Galaxy creation
  const milkyWay = await Galaxy.create(scene1, {
    id: 1,
    name: "Milky Way",
    stars: starsJson
  });
  createStarConfigs(scene1, starsJson, starsController);

  // 🧭 Register scene
  scenesController.addScene(scene1, "Scene1");
  scenesController.setActiveScene("Scene1");

  // 🕹️ Start render loop
  const renderersController = RenderersController.instance(engine);

  const pickingController = PointPickingController.getInstance(scene1, camera);
  
  const pcsInstance = particlesController.getByName(milkyWay.name);
  pickingController.setupClickEvents(scene1, camera, pcsInstance);

  // Add a renderer
  renderersController.addRenderer(
    "stars",
    scene1,
    (dt) => {

     const particlesArray = [
        ...particlesController.particlesNearCamera,
        ...pickingController.cloudPointsNearClick
      ] as BABYLON.CloudPoint[];
      
      const nearbyStarsData = particlesController.cloudPointsToData(scene1, particlesController.particlesNearCamera, milkyWay.stars);
      starsController.manageStars(scene1, nearbyStarsData);
    },
    3 // fps cap
  );

  renderersController.addRenderer(
    "particles",
    scene1,
    (dt) => {
      particlesController.particlesNearCamera =
        particlesController.getParticlesInRadius(camera.position, 12);
    },
    3 // fps cap
  );


  const glow = new BABYLON.GlowLayer("glow", scene1);
  glow.intensity = 3; // adjust brightness


  engine.runRenderLoop(() => {
    const deltaTime = engine.getDeltaTime();
    renderersController.update(deltaTime);
    renderersController.renderAll();
  });

});