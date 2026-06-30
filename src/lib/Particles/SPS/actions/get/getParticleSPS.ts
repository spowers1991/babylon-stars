import * as BABYLON from "babylonjs";
import { ParticlesController } from "../../../ParticlesController";

type SPSParticleWithSourceId = BABYLON.SolidParticle & {
    sourceStarId?: number;
};

export function getParticleSPS(scene: BABYLON.Scene, instanceName: string, id: any): BABYLON.SolidParticle | undefined {
    const SPSInstance = ParticlesController.instance(scene).getSPSByName(instanceName);
    if (!SPSInstance) {
        return;
    }

    if (!SPSInstance.particles || !Array.isArray(SPSInstance.particles)) {
        return;
    }

    // Explicitly type 'p' as Particle
    const particle = SPSInstance.particles.find((p: BABYLON.SolidParticle) => {
        const particleWithSourceId = p as SPSParticleWithSourceId;
        return particleWithSourceId.sourceStarId === id || p.idx === id;
    });

    if (!particle) {
        console.warn(`Particle with id "${id}" not found.`);
        return undefined;
    }
    
    return particle;
}
