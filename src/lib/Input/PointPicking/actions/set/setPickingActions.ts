export function setPickingActions(actions: Array<() => void>) {
  actions.forEach(action => action());
}
