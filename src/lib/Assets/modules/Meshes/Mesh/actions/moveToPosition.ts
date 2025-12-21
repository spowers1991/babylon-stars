export function moveToParticle(mesh: any, position : any){
    if (position) {
      mesh.position.copyFrom(position);
    }
}