import * as BABYLON from "babylonjs";
import { getParticlePCS } from "@/lib/Particles/PCS/actions/get/getParticlePCS";
import { getParticleSPS } from "@/lib/Particles/SPS/actions/get/getParticleSPS";
import { moveToParticle } from "@/lib/Assets/modules/Meshes/Mesh/actions/moveToPosition";
import { Star } from "../../Star";

export function setMeshPosToParticlePos(scene: BABYLON.Scene, star: Star) {
  if (!scene || !star || !star.mesh) return;
   const particlePCS = getParticlePCS(
        scene,
        'Milky Way PCS',
        star.id
      );
  
      const particleSPS = getParticleSPS(
        scene,
        'Milky Way SPS',
        star.id
      );
  
      const particle = particleSPS ? particleSPS : particlePCS
  
      moveToParticle(
        star.mesh, 
        particle?.position
      ); 
    }