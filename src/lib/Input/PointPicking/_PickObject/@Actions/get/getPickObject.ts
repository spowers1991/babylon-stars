import * as BABYLON from "babylonjs";
import { setMeshPick } from "../../Mesh/@Actions/set/setMeshPick";
import { setPCSPick } from "../../PCS/@Actions/set/setPCSPick";
import { setSPSPick } from "../../SPS/@Actions/set/setSPSPick";
import { getPickObjectType } from "./getPickObjectType";

export type PickTypeResult = {
  picked: any;
  pickType: string;
};

export function getPickObject(
  scene: BABYLON.Scene,  
  pointerInfo: BABYLON.PointerInfo,
  element: HTMLElement | any
): PickTypeResult | null {

  if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return null;

  let picked;
  let pickType: string;

  // Try mesh, PCS, SPS picking
  picked = setMeshPick(scene);
  pickType = getPickObjectType(picked);
  if (pickType === "Unknown") {
    picked = setPCSPick(scene, element);
    pickType = getPickObjectType(picked);
  }
  if (pickType === "Unknown") {
    picked = setSPSPick(scene, element);
    pickType = getPickObjectType(picked);
  }
  if (pickType === "Unknown" || !picked) return null;

  return { picked, pickType };
}
  