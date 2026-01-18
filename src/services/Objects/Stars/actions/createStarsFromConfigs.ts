import * as BABYLON from "babylonjs";
import { createStar } from "../Star/actions/createStar";
import { Star } from "../Star/Star";
import { StarsController } from "../StarsController";
import { StarData } from "../Star/types/StarData";
import { StarConfig } from "../Star/types/StarConfig";

export function createStarsFromConfigs(scene : BABYLON.Scene, starData: StarData[], starsController: StarsController){
    const  starIds = new Set<number>();

    const newStars: Star[] = [];

    for (const { i } of starData) {
    // Skip if already created
    if (starIds.has(i)) continue;
  
    const cfg = starsController.starsConfigs.find(cfg => cfg.id === i) as StarConfig;
    // if (!cfg) continue;

    const star = createStar(scene, cfg!) as Star;

    //starsController.stars.push(star);
    starIds.add(i);
    newStars.push(star);
    }

    // Only update renderer if we actually added something
    return newStars;
}