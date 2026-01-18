import { MeshesController } from "./modules/Meshes/MeshesController";
import { TexturesController } from "./modules/Textures/TexturesController";

export class AssetsController {
  private static _instance: AssetsController;

  public readonly meshes: MeshesController;
  public readonly textures: TexturesController;

  private constructor() {
    this.meshes = new MeshesController();
    this.textures = new TexturesController();
  }

  public static get instance(): AssetsController {
    if (!AssetsController._instance) {
      AssetsController._instance = new AssetsController();
    }
    return AssetsController._instance;
  }

  public disposeAll(): void {
    this.meshes.disposeAll();
    this.textures.disposeAll();
  }
}
