import * as BABYLON from "babylonjs";
import { setNearbyDataPCS } from "./setNearbyDataPCS";
import { setNearbyDataSPS } from "./setNearbyDataSPS";
import { setPickingActions } from "./setPickingActions";
import { setClosestPicksPCS } from "./setClosestPicksPCS";
import { handlePickFocus } from "./handlePickFocus";
import { determinePickToFocus } from "./determinePickToFocus";
import { handleMeshPicking } from "./handleMeshPicking";
import { handlePCSPicking } from "./handlePCSPicking";
import { handleSPSPicking } from "./handleSPSPicking";
import { setClosestPicksSPS } from "./setClosetsPickSPS";

export function handlePointerEvent(
  controller: any,
  object: any,
  setter: (data: any[]) => void,
  pointerInfo: BABYLON.PointerInfo
) {
  if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;

  const meshPick = handleMeshPicking(controller);
  const pcsPick = handlePCSPicking(controller, object);
  const spsPick = handleSPSPicking(controller, object);
  const pickToFocus = determinePickToFocus(meshPick, pcsPick, spsPick);
  if (!pickToFocus) return;

  handlePickFocus(controller.getCamera(), pickToFocus);

  if (pcsPick) {
    setPickingActions([
      () => setClosestPicksPCS(controller.scene, pcsPick, controller),
      () => setNearbyDataPCS(controller.scene, object.starsData, setter),
    ]);
  }
  if (spsPick) {
    setPickingActions([
      () => setClosestPicksSPS(controller.scene, spsPick, controller),
      () => setNearbyDataSPS(controller.scene, object.starsData, setter),
    ]);
  }
}