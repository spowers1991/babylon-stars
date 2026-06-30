import * as BABYLON from "babylonjs";
import { setPickFocus } from "../../../@Actions/set/setPickFocus";
import { setPointerEventPCS } from "../../PCS/@Actions/set/setPointerEventPCS";
import { setPointerEventSPS } from "../../SPS/@Actions/set/setPointerEventSPS";
import { getPickObject } from "./getPickObject";

export function getPointerEvents(
  scene: BABYLON.Scene,
  element: HTMLElement | any,
  options: { pickRadius: number },
  data: { configs: any[] },
  setActiveData: (configs: any[]) => void,
  pointerInfo: BABYLON.PointerInfo
) {

  const pick = getPickObject(scene, pointerInfo, element);
  if (!pick) return;

  // Deconstruct pickType and picked from the pick object
  const { pickType, picked } = pick;

  setPickFocus(scene.activeCamera, picked);

  switch (pickType) {
    case "Mesh":
      // Add mesh-specific logic here if needed
      break;
    case "PCSParticle":
      setPointerEventPCS(scene, element, data.configs, setActiveData, pointerInfo);
      break;
    case "SPSParticle":
      setPointerEventSPS(scene, element, options, data.configs, setActiveData, pointerInfo);
      break;
    default:
      break;
  }
}