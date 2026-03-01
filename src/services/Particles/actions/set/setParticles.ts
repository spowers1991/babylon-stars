import { ParticlesController } from "@/lib/Particles/ParticlesController";
import { Galaxy } from "@/services/Objects/Galaxies/Galaxy/Galaxy";


export function setParticles(milkyWay: Galaxy) {
  const particlesController = ParticlesController.instance(milkyWay.scene);
  return particlesController;
}
