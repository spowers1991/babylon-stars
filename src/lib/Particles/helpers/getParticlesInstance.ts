import { ParticlesController } from "../ParticlesController";

export function getParticlesInstance(instance : string){
    const particlesInstance =
    ParticlesController.instance.getByName(instance);

    return particlesInstance
}