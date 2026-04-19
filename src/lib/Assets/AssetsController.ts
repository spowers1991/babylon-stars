import { MeshesController } from "./modules/Meshes/MeshesController";
import { TexturesController } from "./modules/Textures/TexturesController";
import { MaterialsController } from "./modules/Materials/MaterialsController";
import { PipelinesController } from "./modules/PostProcessing/Pipelines/PipelinesController";
import { ShadersController } from "./modules/Shaders/ShadersController";

export class AssetsController {
  private static _instance: AssetsController;

  public readonly meshes: MeshesController;
  public readonly textures: TexturesController;
  public readonly materials: MaterialsController;
  public readonly pipelines: PipelinesController;
  public readonly shaders: any; // Placeholder for ShadersController  

  private constructor() {
    this.meshes = new MeshesController();
    this.textures = new TexturesController();
    this.materials = new MaterialsController();
    this.pipelines = new PipelinesController();
    this.shaders = new ShadersController();
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
    this.materials.disposeAll();
    this.pipelines.disposeAll();
    this.shaders.disposeAll();
}

}