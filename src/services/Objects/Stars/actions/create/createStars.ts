import * as BABYLON from "babylonjs";
import { createStar } from "../../Star/actions/create/createStar";
import { Star } from "../../Star/Star";
import type { StarConfig } from "../../Star/types/StarConfig";

export function createStars(scene : BABYLON.Scene, activeStarsConfigs: StarConfig[]){

    const newStars: Star[] = [];

    for (const starConfig of activeStarsConfigs) {
        
        if (!starConfig) continue;
        const star = createStar(scene, starConfig!) as Star;

        newStars.push(star);
        
    }
   
    return newStars;
}