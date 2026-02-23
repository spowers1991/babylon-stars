import { StarsController } from "@/services/Objects/Stars/StarsController";
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import type { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";
import starsJson from "@/data/stars.json";

export function setupStars(galaxy: Galaxy) {  
    const starsController = StarsController.instance(galaxy.scene);
    starsController.createConfigs(starsJson as StarData[]);

    return starsController;
}