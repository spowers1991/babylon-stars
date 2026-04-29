import * as BABYLON from "babylonjs";
import { setNearbyDataPCS } from "../actions/set/setNearbyDataPCS";
import { setPickingActions } from "../../../actions/set/setPickingActions";
import { setClosestPicksPCS } from "../actions/set/setClosestPicksPCS";
import { handlePickFocus } from "../../helpers/handlePickFocus";
import { determinePickToFocus } from "../../helpers/determinePickToFocus";
import { handlePCSPicking } from "./handlePCSPicking";
import { handleMeshPicking } from "../../_Mesh/actions/helpers/handleMeshPicking";

export function handlePointerEventPCS(
  controller: any,
  element: any,
  matchedConfigsPicks: any[],
  setActiveConfigs: (configs: any[]) => void,
  pointerInfo: BABYLON.PointerInfo
) {
  if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;

  const meshPick = handleMeshPicking(controller);
  const pcsPick = handlePCSPicking(controller, element);
  const pickToFocus = determinePickToFocus(meshPick, pcsPick, null);
  if (!pickToFocus) return;

  handlePickFocus(controller.getCamera(), pickToFocus);

  if (pcsPick) {
    setPickingActions([
      () => setClosestPicksPCS(controller.scene, pcsPick, controller),
      () => setNearbyDataPCS(controller.scene, matchedConfigsPicks, setActiveConfigs),
    ]);
  }
}
