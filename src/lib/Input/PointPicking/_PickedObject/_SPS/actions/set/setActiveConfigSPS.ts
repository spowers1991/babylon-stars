import * as BABYLON from "babylonjs";
import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { PointPickingController } from "../../../../PointPickingController";
import { ActiveObjectController } from "@/lib/Objects/Object/_ActiveObject/ActiveObjectController";

export function setActiveConfigSPS(
  scene: BABYLON.Scene,
  configsFromPick: any[],
  setActiveConfig: (config: any) => void
) {

  const particlesController = ParticlesController.instance(scene);
  const pickingController = PointPickingController.instance(scene);
  const activeObjectController = ActiveObjectController.instance(scene);

  const activeConfig = particlesController.createConfigsArrayFromSPS(
    activeObjectController.activeObject as any,
    configsFromPick
  );
  
  setActiveConfig(activeConfig);
}