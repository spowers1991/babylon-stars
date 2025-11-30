import { MeshesController } from "./modules/Meshes/MeshesController";
import { TexturesController } from "./modules/Textures/TexturesController";

export class AssetsController {
  public readonly meshes: MeshesController;
  public readonly textures: TexturesController;

  constructor() {
    this.meshes = new MeshesController();
    this.textures = new TexturesController();
  }

  public disposeAll(): void {
    this.meshes.disposeAll();
    this.textures.disposeAll();
  }
}
