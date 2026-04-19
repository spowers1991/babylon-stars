import * as BABYLON from "babylonjs";
import { handlePickFocus } from "../../_PickedObject/helpers/handlePickFocus";
import { handleMeshPicking } from "../../_PickedObject/_Mesh/actions/helpers/handleMeshPicking";
import { handlePCSPicking } from "../../_PickedObject/_PCS/helpers/handlePCSPicking";
import { handlePointerEventPCS } from "../../_PickedObject/_PCS/helpers/handlePointerEventPCS";
import { handleSPSPicking } from "../../_PickedObject/_SPS/actions/helpers/handleSPSPicking";
import { handlePointerEventSPS } from "../../_PickedObject/_SPS/actions/helpers/handlePointerEventSPS";
import { checkPickedObjectType } from "../../_PickedObject/helpers/checkPickedObjectType";
import { PointPickingController } from "../../PointPickingController";

export function handlePointerEvent(
  pointPickingController: PointPickingController,
  element: any,
  options: { pickRadius: number },
  matchedConfigsFromPick: any[],
  setActiveConfigs: (configs: any[]) => void,
  pointerInfo: BABYLON.PointerInfo
) {
  if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;

  let picked;
  let pickType: string;

  // Try mesh, PCS, SPS picking
  picked = handleMeshPicking(pointPickingController);
  pickType = checkPickedObjectType(picked);
  if (pickType === "Unknown") {
    picked = handlePCSPicking(pointPickingController, element);
    pickType = checkPickedObjectType(picked);
  }
  if (pickType === "Unknown") {
    picked = handleSPSPicking(pointPickingController, element);
    pickType = checkPickedObjectType(picked);
  }
  if (pickType === "Unknown" || !picked) return;

  handlePickFocus(pointPickingController.getCamera(), picked);

  switch (pickType) {
    case "Mesh":
      // Add mesh-specific logic here if needed
      break;
    case "PCSParticle":
      handlePointerEventPCS(pointPickingController, element, matchedConfigsFromPick, setActiveConfigs, pointerInfo);
      break;
    case "SPSParticle":
      handlePointerEventSPS(pointPickingController, element, options, matchedConfigsFromPick, setActiveConfigs, pointerInfo);
      break;
    default:
      break;
  }
}