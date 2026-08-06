import * as BABYLON from "babylonjs";
import { setPointerEventsSPS } from "../../_PickObject/SPS/actions/set/setPointerEventsSPS";
import { getPickObject } from "../../_PickObject/actions/get/getPickObject";

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

  switch (pickType) {
    case "Mesh":
      // Add mesh-specific logic here if needed
      break;
    case "PCSParticle":
      // setPointerEventPCS(scene, element, data.configs, setActiveData, pointerInfo);
      break;
    case "SPSParticle":
      setPointerEventsSPS(scene, element, options, data.configs, setActiveData, pointerInfo);
      break;
    default:
      break;
  }
}