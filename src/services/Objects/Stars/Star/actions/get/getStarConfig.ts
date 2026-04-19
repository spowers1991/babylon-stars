
import * as BABYLON from "babylonjs";
import { StarData } from "../../types/StarData";
import { StarConfig } from "../../types/StarConfig";
import { getSpectralClass } from "./getSpectralClass";

export function getStarConfig(star: StarData){

    const k = star.K ?? { r: 1, g: 1, b: 1 };
    const spectralClass = getSpectralClass(star);
    const config: StarConfig = {
        id: star.i,
        name: star.n,
        diameter: star.p!,
        textureUrl: "texture1.jpg",
        emissiveColor: new BABYLON.Color3(k.r, k.g, k.b),
        emissiveIntensity: 0.25,
        position: new BABYLON.Vector3(
            star.x ?? 0,
            star.y ?? 0,
            star.z ?? 0
        ),
        spectralClass,
    };
    return config;
}