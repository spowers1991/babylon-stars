import { startEngine } from "@/engine/actions/startEngine";
import { RenderersController } from "@/lib/Renderers/RenderersController";
import { setupScenes } from "@/services/Scenes/actions/setupScenes";
import { setupCameras } from "@/services/Cameras/actions/setupCameras";
import { createGalaxies } from "@/services/Objects/Galaxies/actions/createGalaxies";
import { setupStars } from "@/services/Objects/Stars/actions/setupStars";
import { setupPicking } from "@/services/Input/PointPicking/actions/setupPicking";
import { Render } from "@/services/Renderers/Render";
import MainCamera from "@/services/Cameras/MainCamera/MainCamera";
import starsJson from "@/data/stars.json";

window.addEventListener("DOMContentLoaded", async () => {

  const { canvas, engine } = startEngine("renderCanvas");

  const { scenes } = setupScenes(engine);

  const scene1 = scenes[0];

  setupCameras(scene1, MainCamera, canvas);

  const galaxiesConfigs = [
    {
      id: 1,
      name: "Milky Way",
      starsData: starsJson,
    },
  ];
  
  const galaxies = await createGalaxies(scenes, galaxiesConfigs);

  const milkyWay = galaxies.find(galaxy => galaxy.name === "Milky Way")!;

  setupStars(milkyWay);

  setupPicking(milkyWay);
  
  RenderersController.runLoop(
    engine,
    [
      Render.scenes(scene1), 
      Render.stars(scene1),
      Render.particles(scene1, milkyWay),
    ]
  );
  
});