export function determinePickToFocus(meshPick?: any, pcsPick?: any, spsPick?: any) {
  if (meshPick?.pickedMesh) {
    return meshPick;
  } else if (pcsPick) {
    return pcsPick;
  }
  else if (spsPick) {
    return spsPick;
  }
  return null;
}