import * as BABYLON from "babylonjs";
import { setNearbyConfigsSPS } from "./setNearbyConfigsSPS";
import { setPickingActions } from "../../../../@Actions/set/setPickActions";
import { setClosestPicksSPS } from "./setClosetPicksSPS";
import { setPickFocus } from "@/lib/Input/PointPicking/@Actions/set/setPickFocus";
import { setPickToFocus } from "@/lib/Input/PointPicking/@Actions/set/setPickToFocus";
import { setMeshPick } from "../../../Mesh/@Actions/set/setMeshPick";
import { setSPSPick } from "./setSPSPick";

export function setPointerEventSPS(
  scene: any,
  element: any,
  options: { pickRadius: number },
  configs: any[],
  setActiveData: (configs: any[]) => void,
  pointerInfo: BABYLON.PointerInfo
) {
  if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERDOWN) return;

  const meshPick = setMeshPick(scene);
  const spsPick = setSPSPick(scene, element);
  const pickToFocus = setPickToFocus(meshPick, null, spsPick);
  if (!pickToFocus) return;
  
  setPickFocus(scene.activeCamera, pickToFocus);

  if (spsPick) {
    setPickingActions([
      () => setClosestPicksSPS(scene, spsPick, options),
      () => setNearbyConfigsSPS(scene, configs, setActiveData),
    ]);
  }
}
