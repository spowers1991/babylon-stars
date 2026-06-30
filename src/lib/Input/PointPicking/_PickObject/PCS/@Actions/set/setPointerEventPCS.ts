import * as BABYLON from "babylonjs";
import { setNearbyDataPCS } from "./setNearbyDataPCS";
import { setPickingActions } from "../../../../@Actions/set/setPickActions";
import { setClosestPicksPCS } from "./setClosestPicksPCS";
import { setPickFocus } from "../../../../@Actions/set/setPickFocus";
import { setPickToFocus } from "../../../../@Actions/set/setPickToFocus";
import { setPCSPick } from "./setPCSPick";
import { setMeshPick } from "../../../Mesh/@Actions/set/setMeshPick";

export function setPointerEventPCS(
  controller: any,
  element: any,
  matchedConfigsPicks: any[],
  setActiveData: (configs: any[]) => void,
  pointerInfo: BABYLON.PointerInfo
) {
  if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;

  const meshPick = setMeshPick(controller);
  const pcsPick = setPCSPick(controller, element);
  const pickToFocus = setPickToFocus(meshPick, pcsPick, null);
  if (!pickToFocus) return;

  setPickFocus(controller.getCamera(), pickToFocus);

  if (pcsPick) {
    setPickingActions([
      () => setClosestPicksPCS(controller.scene, pcsPick, controller),
      () => setNearbyDataPCS(controller.scene, matchedConfigsPicks, setActiveData),
    ]);
  }
}
