import * as BABYLON from "babylonjs";
import { setNearbyConfigsSPS } from "../set/setNearbyConfigsSPS";
import { setPickingActions } from "../../../../actions/set/setPickingActions";
import { setClosestPicksSPS } from "../set/setClosetPicksSPS";
import { handlePickFocus } from "../../../helpers/handlePickFocus";
import { determinePickToFocus } from "../../../helpers/determinePickToFocus";
import { handleMeshPicking } from "../../../_Mesh/actions/helpers/handleMeshPicking";
import { handleSPSPicking } from "./handleSPSPicking";

export function handlePointerEventSPS(
  controller: any,
  element: any,
  options: { pickRadius: number },
  matchedConfigsFromPick: any[],
  setActiveConfigs: (configs: any[]) => void,
  pointerInfo: BABYLON.PointerInfo
) {
  if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;

  const meshPick = handleMeshPicking(controller);
  const spsPick = handleSPSPicking(controller, element);
  const pickToFocus = determinePickToFocus(meshPick, null, spsPick);
  if (!pickToFocus) return;

  handlePickFocus(controller.getCamera(), pickToFocus);

  if (spsPick) {
    setPickingActions([
      () => setClosestPicksSPS(controller.scene, spsPick, options, controller),
      () => setNearbyConfigsSPS(controller.scene, matchedConfigsFromPick, setActiveConfigs),
    ]);
  }
}
