import { getParticlesInstance } from "./getParticlesInstance";

export function findParticle(instance : string, id : number){
    const particlesInstance = getParticlesInstance(instance);
    const particle = particlesInstance.particles.find(p => p.idx === id);

    return particle;
}