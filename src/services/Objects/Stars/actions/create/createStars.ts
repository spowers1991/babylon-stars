import * as BABYLON from "babylonjs";
import { createStar } from "../../Star/actions/create/createStar";
import { Star } from "../../Star/Star";
import type { StarConfig } from "../../Star/types/StarConfig";
import { StarsController } from "../../StarsController";

export function createStars(scene : BABYLON.Scene, activeStarsConfigs: StarConfig[]){
    const newStars: Star[] = [];
    const starsController = StarsController.instance(scene);

    activeStarsConfigs.forEach(config => {
        const existingStarIndex = starsController.stars.findIndex(
            star => star.name === config.name
        );
        const existingStar = starsController.stars[existingStarIndex];

        if (existingStar?.mesh && !existingStar.mesh.isDisposed()) {
            newStars.push(existingStar);
        } else {
            const newStar = createStar(scene, config);
            if (existingStarIndex !== -1) {
                starsController.stars[existingStarIndex] = newStar;
            } else {
                starsController.stars.push(newStar);
            }
            newStars.push(newStar);
        }
    });

    return newStars;
}