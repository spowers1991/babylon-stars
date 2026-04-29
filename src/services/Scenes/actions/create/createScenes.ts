import * as BABYLON from "babylonjs";
import { ScenesController } from '@/lib/Scenes/ScenesController';
import Scenes from '../../Scenes';

export function createScenes(engine: BABYLON.Engine) {

    const scenesController = new ScenesController();

    Scenes.forEach(({ name, config }) => {
        const scene = scenesController.createScene(engine, config);
        scenesController.addScene(scene, name);
    });

    return { scenes: scenesController.scenes.map(entry => entry.scene) };
}
