import { startEngine } from "@/engine/actions/startEngine";
import { createScenes } from "@/services/Scenes/actions/create/createScenes";
import { createCameras } from "@/services/Cameras/actions/create/createCameras";
import { createGalaxies } from "@/services/Objects/Galaxies/actions/create/createGalaxies";
import { createPointPicking } from "@/services/Input/PointPicking/actions/create/createPointPicking";
import { runRenders } from "@/services/Renderers/actions/run/runRenders";
import { createPostProcessing } from "@/services/PostProcessing/create/createPostProcessing";
import MainCamera from "@/services/Cameras/MainCamera/MainCamera";
import starsJson from "@/data/stars.json";


window.addEventListener("DOMContentLoaded", async () => {

  const { canvas, engine } = startEngine("renderCanvas");

  const { scenes } = createScenes(engine);

  const scene1 = scenes[0];

  createCameras(scene1, canvas, MainCamera);

  const galaxiesConfigs = [
    {
      id: 1,
      name: "Milky Way",
      starsData: starsJson,
    },
  ];

  //setStarsData(scene1);
  
  const galaxies = await createGalaxies(scene1, galaxiesConfigs);

  const milkyWay = galaxies.find(galaxy => galaxy.name === "Milky Way")!;


  const glow = new BABYLON.GlowLayer("glow", scene1 as any);
  glow.intensity = 0.1;
  
  scene1.clearColor = new BABYLON.Color4(0, 0, 0, 1);

  createPostProcessing(scene1, {
    bloomEnabled: true,
    bloomThreshold: 0.25,
    bloomWeight: 0.5,
    bloomKernel: 164,
    bloomScale: 1.5,
    fxaaEnabled: true,
  });

  createPointPicking(scene1, milkyWay);

  runRenders(engine, scene1);
  
});