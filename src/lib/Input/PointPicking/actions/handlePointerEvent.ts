import * as BABYLON from "babylonjs";
import { setNearbyData } from "./setNearbyData";
import { setPickingActions } from "./setPickingActions";
import { setClosestPicksPCS } from "./setClosestPicksPCS";
import { handlePickFocus } from "./handlePickFocus";
import { determinePickToFocus } from "./determinePickToFocus";
import { handleMeshPicking } from "./handleMeshPicking";
import { handlePCSPicking } from "./handlePCSPicking";

export function handlePointerEvent(
  controller: any,
  object: any,
  setter: (data: any[]) => void,
  pointerInfo: BABYLON.PointerInfo
) {
  if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;

  const meshPick = handleMeshPicking(controller);
  const pcsPick = handlePCSPicking(controller, object);

  const pickToFocus = determinePickToFocus(meshPick, pcsPick);
  if (!pickToFocus) return;

  handlePickFocus(controller.getCamera(), pickToFocus);

  if (pcsPick) {
    setPickingActions([
      () => setClosestPicksPCS(controller.scene, pcsPick, controller),
      () => setNearbyData(controller.scene, object.starsData, setter),
    ]);
  }
}