import * as BABYLON from "babylonjs";
import { handlePickFocus } from "./handlePickFocus";
import { handleMeshPicking } from "../_Mesh/actions/helpers/handleMeshPicking";
import { handlePCSPicking } from "../_PCS/helpers/handlePCSPicking";
import { handlePointerEventPCS } from "../_PCS/helpers/handlePointerEventPCS";
import { handleSPSPicking } from "../_SPS/actions/helpers/handleSPSPicking";
import { handlePointerEventSPS } from "../_SPS/actions/helpers/handlePointerEventSPS";
import { checkPickedObjectType } from "./checkPickedObjectType";

export function handlePointerEvent(
  controller: any,
  object: any,
  setter: (data: any[]) => void,
  pointerInfo: BABYLON.PointerInfo
) {
  if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;

  let picked;
  let pickType: string;

  // Try mesh, PCS, SPS picking
  picked = handleMeshPicking(controller);
  pickType = checkPickedObjectType(picked);
  if (pickType === "Unknown") {
    picked = handlePCSPicking(controller, object);
    pickType = checkPickedObjectType(picked);
  }
  if (pickType === "Unknown") {
    picked = handleSPSPicking(controller, object);
    pickType = checkPickedObjectType(picked);
  }
  if (pickType === "Unknown" || !picked) return;

  handlePickFocus(controller.getCamera(), picked);

  switch (pickType) {
    case "Mesh":
      // Add mesh-specific logic here if needed
      break;
    case "PCSParticle":
      handlePointerEventPCS(controller, object, setter, pointerInfo);
      break;
    case "SPSParticle":
      handlePointerEventSPS(controller, object, setter, pointerInfo);
      break;
    default:
      break;
  }
}