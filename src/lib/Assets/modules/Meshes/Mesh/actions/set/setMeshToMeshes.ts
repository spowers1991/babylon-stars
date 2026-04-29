import * as BABYLON from "babylonjs";

export function setMeshToMeshes(meshes: BABYLON.Mesh[], mesh: BABYLON.Mesh): void {
    
    const newMeshes = [...meshes, mesh];
	// Remove duplicates by mesh name (keep last occurrence)
	const seen = new Set<string>();
	const unique = [];
	for (let i = newMeshes.length - 1; i >= 0; i--) {
		const m = newMeshes[i];
		if (!seen.has(m.name)) {
			seen.add(m.name);
			unique.unshift(m);
		}
	}
	meshes.length = 0;
	meshes.push(...unique);
}