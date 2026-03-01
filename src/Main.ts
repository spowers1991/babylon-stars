import { startEngine } from "@/engine/actions/startEngine";
import { setScenes } from "@/services/Scenes/actions/set/setScenes";
import { setCameras } from "@/services/Cameras/actions/set/setCameras";
import { createGalaxies } from "@/services/Objects/Galaxies/actions/create/createGalaxies";
import { setStarsData } from "@/services/Objects/Stars/actions/set/setStarsData";
import { setPointPicking } from "@/services/Input/PointPicking/actions/set/setPointPicking";
import { setRenderers } from "@/services/Renderers/actions/set/setRenderers";
import { runRenders } from "@/services/Renderers/actions/run/runRenders";
import MainCamera from "@/services/Cameras/MainCamera/MainCamera";
import starsJson from "@/data/stars.json";

window.addEventListener("DOMContentLoaded", async () => {

  const { canvas, engine } = startEngine("renderCanvas");

  const { scenes } = setScenes(engine);

  const scene1 = scenes[0];

  setCameras(scene1, canvas, MainCamera);

  const galaxiesConfigs = [
    {
      id: 1,
      name: "Milky Way",
      starsData: starsJson,
    },
  ];
  
  const galaxies = await createGalaxies(scenes, galaxiesConfigs);

  const milkyWay = galaxies.find(galaxy => galaxy.name === "Milky Way")!;

  setStarsData(scene1, milkyWay);

  setPointPicking(scene1, milkyWay);

  setRenderers(engine, scene1);

  runRenders(scene1);
  
});