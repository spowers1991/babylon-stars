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
import { GalaxiesController } from "@/services/Objects/Galaxies/GalaxiesController";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import starsJson from "@/data/stars.json";

window.addEventListener("DOMContentLoaded", async () => {
  const { canvas, engine } = startEngine("renderCanvas");

  const scenesController = new ScenesController();

  const scene1 = scenesController.createScene(engine, {
    clearColor: new BABYLON.Color4(0.05, 0.05, 0.1, 1),
  });

  const camerasController = CamerasController.instance(scene1);
  
  camerasController.addCamera(canvas, MainCamera);

  const galaxiesController = GalaxiesController.instance(scene1);

  const milkyWay = await Galaxy.create(scene1, {
    id: 1,
    name: "Milky Way",
    starsData: starsJson,
  });

  galaxiesController.add(milkyWay);

  const starsController = StarsController.instance(scene1);

  starsController.createConfigs(milkyWay.starsData);

  const particlesController = ParticlesController.instance(scene1); 

  const particlesPCS = particlesController.getPCSByName(milkyWay.name+" PCS");
  const particlesSPS = particlesController.getSPSByName(milkyWay.name+" SPS");

  const pickingController = PointPickingController.instance(scene1);

  pickingController.setCamera(camerasController.getActiveCamera() as BABYLON.Camera);

  pickingController.setupPickingEvents(particlesPCS);

  engine.runRenderLoop(() => {
    const deltaTime = engine.getDeltaTime();

    const nearbyStarsData = particlesController.particlesToDataPCS(
      pickingController.closestPicksPCS,
      milkyWay.starsData
    );

    starsController.updateStars(nearbyStarsData);
   
    particlesController.updatePCS(particlesPCS, starsController.starsConfigs);
    particlesController.updateSPS(particlesSPS, nearbyStarsData, { visibleScale : 1});

    scene1.render();
  });

});