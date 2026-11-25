import * as BABYLON from "babylonjs";
import { ParticlesController } from "../../../ParticlesController";
import { getParticleKeySPS } from "./getParticleKeySPS";

type ParticleIndex = {
    particles: BABYLON.SolidParticle[];
    count: number;
    byId: Map<number | undefined, BABYLON.SolidParticle>;
};

// Source IDs are assigned when the SPS is initialized and remain fixed for its particles.
const particleIndexes = new WeakMap<BABYLON.SolidParticleSystem, ParticleIndex>();

export function getParticleSPS(scene: BABYLON.Scene, instanceName: string, id: number | undefined): BABYLON.SolidParticle | undefined {
    const SPSInstance = ParticlesController.instance(scene).getSPSByName(instanceName);
    if (!SPSInstance) {
        return;
    }

    if (!SPSInstance.particles || !Array.isArray(SPSInstance.particles)) {
        return;
    }

    let index = particleIndexes.get(SPSInstance);
    if (!index || index.particles !== SPSInstance.particles || index.count !== SPSInstance.particles.length) {
        const byId = new Map<number | undefined, BABYLON.SolidParticle>();
        for (const particle of SPSInstance.particles) {
            const key = getParticleKeySPS(particle);
            if (!byId.has(key)) byId.set(key, particle);
        }
        index = { particles: SPSInstance.particles, count: SPSInstance.particles.length, byId };
        particleIndexes.set(SPSInstance, index);
    }

    const particle = index.byId.get(id);

    if (!particle) {
        console.warn(`Particle with id "${id}" not found.`);
        return undefined;
    }
    
    return particle;
}
