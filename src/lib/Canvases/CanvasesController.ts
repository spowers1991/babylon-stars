export class CanvasesController {
  private static _instance: CanvasesController | null = null;

  private canvases: Map<string, HTMLCanvasElement> = new Map();

  private constructor() {}

  public static instance(): CanvasesController {
    if (!CanvasesController._instance) {
      CanvasesController._instance = new CanvasesController();
    }
    return CanvasesController._instance;
  }

  public getCanvas(canvasId: string): HTMLCanvasElement {
    if (this.canvases.has(canvasId)) {
      return this.canvases.get(canvasId)!;
    }

    const elem = document.getElementById(canvasId);
    if (!(elem instanceof HTMLCanvasElement)) {
      throw new Error(
        `Element with id '${canvasId}' is not a HTMLCanvasElement.`
      );
    }

    this.canvases.set(canvasId, elem);
    return elem;
  }

  public getAllCanvases(): HTMLCanvasElement[] {
    return Array.from(this.canvases.values());
  }
}
