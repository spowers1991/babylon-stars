import * as BABYLON from "babylonjs";
import { createStar } from "../../Star/actions/createStar";
import { Star } from "../../Star/Star";
import { StarsController } from "../../StarsController";
import type { StarData } from "../../Star/types/StarData";
import type { StarConfig } from "../../Star/types/StarConfig";

export function createStars(scene : BABYLON.Scene, activeStarsData: StarData[]){
    const starsController = StarsController.instance(scene);
    
    const  starIds = new Set<number>();

    const newStars: Star[] = [];

    for (let i = 0; i < activeStarsData.length; i++) {

        if (starIds.has(i)) continue;
    
        const starConfig = starsController.starsConfigs.find(starConfig => starConfig.id === i) as StarConfig;
        
        if (!starConfig) continue;

        const star = createStar(scene, starConfig!) as Star;

        starIds.add(i);
        newStars.push(star);
    }

    return newStars;
}