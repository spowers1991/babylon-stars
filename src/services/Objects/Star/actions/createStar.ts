import { Star } from "../Star";
import { StarConfig } from "../types/StarConfig";
import * as BABYLON from "babylonjs";

export function createStar(
  scene: BABYLON.Scene,
  config: StarConfig
): Star {
  return new Star(scene, config);
}
