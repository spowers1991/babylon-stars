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
  
  const particlesPCS = particlesController.getPCSByName(milkyWay.name+" PCS");
  const particlesSPS = particlesController.getPCSByName(milkyWay.name+" SPS");

  pickingController.setupClickEvents(scene1, camera, particlesPCS);

  // Create a glow layer
  const glow = new BABYLON.GlowLayer("glow", scene1);

  // Optional: customize intensity
  glow.intensity = 1;
  
  // Add a renderer
  engine.runRenderLoop(() => {
    const deltaTime = engine.getDeltaTime();

    // 1️⃣ Update nearby particles
    particlesController.particlesNearCameraPCS =
      particlesController.getParticlesInRadiusPCS(camera.position, 8);
    
    // 2️⃣ Convert particles to star data and manage stars
    const nearbyStarsData = particlesController.particlesToDataPCS(
      scene1,
      particlesController.particlesNearCameraPCS,
      milkyWay.stars
    );
    starsController.manageStars(scene1, nearbyStarsData);
    particlesController.updatePCS(particlesPCS, starsController.starsConfigs);
    particlesController.updateSPS(particlesSPS, nearbyStarsData, { visibleScale : 1})

    // 3️⃣ Render the scene
    scene1.render();
  });

});