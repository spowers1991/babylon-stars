import { CanvasesController } from "@/lib/Canvases/CanvasesController";

export function startEngine(canvasId: string = "renderCanvas") {
  const canvases = new CanvasesController();
  const { canvas, engine } = canvases.addCanvas(canvasId);

  // Handle resize globally
  window.addEventListener("resize", () => {
    engine.resize();
  });

  return { canvas, engine };
}
