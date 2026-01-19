import * as BABYLON from "babylonjs";
import { CanvasesController } from "@/lib/Canvases/CanvasesController";

export function startEngine(canvasId: string = "renderCanvas") {
  const canvas = CanvasesController.instance().getCanvas(canvasId);

  const engine = new BABYLON.Engine(canvas, true);

  window.addEventListener("resize", () => {
    engine.resize();
  });

  return { canvas, engine };
}
