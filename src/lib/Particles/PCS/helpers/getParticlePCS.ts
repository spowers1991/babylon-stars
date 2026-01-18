import * as BABYLON from "babylonjs";
import { ParticlesController } from "../../ParticlesController";

export function getParticlePCS(instanceName: string, id: any): BABYLON.CloudPoint | undefined {
    const PCSInstance = ParticlesController.instance.getPCSByName(instanceName);
    if (!PCSInstance) {
        console.warn(`Particle system "${instanceName}" not found.`);
        return undefined;
    }

    if (!PCSInstance.particles || !Array.isArray(PCSInstance.particles)) {
        console.warn(`No particles found in PCS "${instanceName}".`);
        return undefined;
    }

    // Explicitly type 'p' as Particle
    const particle = PCSInstance.particles.find((p: BABYLON.CloudPoint) => p.idx === id);

    if (!particle) {
        console.warn(`Particle with id "${id}" not found.`);
        return undefined;
    }
    
    return particle;
}
