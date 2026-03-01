import * as BABYLON from "babylonjs";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import { getStarsData } from "../get/getStarsData";
import type { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";

export function setStarsData(scene: BABYLON.Scene, galaxy?: Galaxy) {
    const starsController = StarsController.instance(scene);

    const starsData = getStarsData() as StarData[];

    galaxy && (galaxy.starsData = starsData);

    starsController.createConfigs(starsData);

}