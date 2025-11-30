import * as BABYLON from "babylonjs";

export class CanvasesController{
  private canvases: HTMLCanvasElement[] = [];
  private engines: BABYLON.Engine[] = [];

  public addCanvas(canvasId: string): { canvas: HTMLCanvasElement; engine: BABYLON.Engine } {
    const elem = document.getElementById(canvasId);
    if (!(elem instanceof HTMLCanvasElement)) {
      throw new Error(`Element with id '${canvasId}' is not a HTMLCanvasElement.`);
    }
    const engine = new BABYLON.Engine(elem, true);
    this.canvases.push(elem);
    this.engines.push(engine);
    return { canvas: elem, engine: engine };
  }

  public getCanvases(): HTMLCanvasElement[] {
    return this.canvases;
  }

  public getEngines(): BABYLON.Engine[] {
    return this.engines;
  }
}
