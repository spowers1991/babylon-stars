export function determinePickToFocus(meshPick: any, pcsPick: any) {
  if (meshPick?.pickedMesh) {
    return meshPick;
  } else if (pcsPick) {
    return pcsPick;
  }
  return null;
}