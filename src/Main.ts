import { startEngine } from "@/engine/actions/startEngine";
import { setScenes } from "@/services/Scenes/actions/set/setScenes";
import { setCameras } from "@/services/Cameras/actions/set/setCameras";
import { createGalaxies } from "@/services/Objects/Galaxies/actions/create/createGalaxies";
import { setPointPicking } from "@/services/Input/PointPicking/actions/set/setPointPicking";
import { runRenders } from "@/services/Renderers/actions/run/runRenders";
import MainCamera from "@/services/Cameras/MainCamera/MainCamera";
import starsJson from "@/data/stars.json";
import { setStarsData } from "./services/Objects/Stars/actions/set/setStarsData";

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

  setStarsData(scene1);
  
  const galaxies = await createGalaxies(scene1, galaxiesConfigs);

  const milkyWay = galaxies.find(galaxy => galaxy.name === "Milky Way")!;

  setPointPicking(scene1, milkyWay);

  runRenders(engine, scene1);
  
});