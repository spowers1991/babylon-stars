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
/*
  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
*/
  const scenesController = new ScenesController();
  const objectsController = new ObjectsController();
  const particlesController = ParticlesController.instance; 
  const camerasController = new CamerasController();
  const starsController = new StarsController();
  const renderersController = RenderersController.instance(engine);

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

  const particlesPCS = particlesController.getPCSByName(milkyWay.name+" PCS");
  const particlesSPS = particlesController.getSPSByName(milkyWay.name+" SPS");

  const pickingController = PointPickingController.getInstance(scene1, camera);

  pickingController.setupPointerEvents(particlesPCS)

  // Add a renderer
  engine.runRenderLoop(() => {
    const deltaTime = engine.getDeltaTime();

    const nearbyStarsData = particlesController.particlesToDataPCS(
      scene1,
      pickingController.closePickPCS,
      milkyWay.stars
    );

    starsController.updateStars(scene1, nearbyStarsData);
   
    particlesController.updatePCS(particlesPCS, starsController.starsConfigs);
    particlesController.updateSPS(particlesSPS, nearbyStarsData, { visibleScale : 1})
   
    scene1.render();
  });

});