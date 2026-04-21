import * as BABYLON from "babylonjs";
import { setStarSize } from "../../Star/actions/set/setStarSize";
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";
import { StarConfig } from "@/services/Objects/Stars/Star/types/StarConfig";
import { StarsController } from "@/services/Objects/Stars/StarsController";
import { createSpectralClass } from "../../Star/actions/create/createSpectralClass";

export function createStarsConfigs(data: StarData[], starsController: StarsController): StarConfig[] {

    const addedConfigs: StarConfig[] = [];
    
    data.forEach(i => {
        if (!i) return;
        const spectralClass = createSpectralClass(i);
        const starConfig: StarConfig = {
            id: i.i!,
            name: i.n!,
            diameter: setStarSize(i.p!),
            textureUrl: '',
            emissiveColor: new BABYLON.Color3(i!.K?.r, i!.K?.g, i!.K?.b),
            emissiveIntensity: setStarSize(i.N!) * 5 || 1,
            position: new BABYLON.Vector3(i!.x!, i!.y!, i!.z!),
            spectralClass,
        };
        starsController.addConfig(starConfig);
        addedConfigs.push(starConfig);
    });
    return addedConfigs;
}