import * as BABYLON from "babylonjs";
import { createStar } from "../../Star/actions/create/createStar";
import { Star } from "../../Star/Star";
import type { StarConfig } from "../../Star/types/StarConfig";
import { StarsController } from "../../StarsController";

export function createStars(scene : BABYLON.Scene, activeStarsConfigs: StarConfig[]){

    const newStars: Star[] = [];

    const starsController = StarsController.instance(scene);

    const existingStars = starsController.stars.filter(star => {
        return activeStarsConfigs.some(config => config.name === star.name);
    });

    if(existingStars.length > 0) {
        existingStars.forEach(star => {
            if(!newStars.includes(star)) {
                newStars.push(star);
            }
        });
    }

    activeStarsConfigs.forEach(config => {
        const existingStar = existingStars.find(star => star.name === config.name);
        if(!existingStar) {
            const newStar = createStar(scene, config);
            newStars.push(newStar);
        }
    });
    console.log("New Stars created: ", newStars, "scene:", scene);
    return newStars;
}