import * as BABYLON from "babylonjs";
import { MAX_RENDER_OBJECTS } from "@/lib/Objects/actions/set/setObjectsToRender";
import type { Star } from "../../Star/Star";
import type { StarConfig } from "../../Star/types/StarConfig";
import type { StarsController } from "../../StarsController";
import { createStars } from "../create/createStars";

const INITIAL_STAR_LOAD_INTERVAL_MS = 50;
const MAX_STAR_LOAD_INTERVAL_MS = 100;
const FAST_STAR_COUNT = 50;

type LoadState = {
  timer: ReturnType<typeof setTimeout> | null;
  requestedConfigs: StarConfig[] | null;
};

const loadStates = new WeakMap<StarsController, LoadState>();

export function updateStars(
  scene: BABYLON.Scene,
  controller: StarsController,
  activeStarsConfigs: StarConfig[],
): void {
  if (scene.isDisposed) {
    return;
  }

  let state = loadStates.get(controller);
  if (!state) {
    state = { timer: null, requestedConfigs: null };
    loadStates.set(controller, state);
    const loadState = state;
    scene.onDisposeObservable.addOnce(() => {
      if (loadState.timer !== null) {
        clearTimeout(loadState.timer);
        loadState.timer = null;
      }
      loadStates.delete(controller);
    });
  }

  const configs = activeStarsConfigs.slice(0, MAX_RENDER_OBJECTS);
  const requestedConfigs = state.requestedConfigs;
  if (
    requestedConfigs &&
    configs.length === requestedConfigs.length &&
    configs.every((config, index) => config === requestedConfigs[index]) &&
    controller.objectsToRender.every((object) => {
      const star = object as Star;
      return star.mesh && !star.mesh.isDisposed();
    })
  ) {
    return;
  }

  if (state.timer !== null) {
    clearTimeout(state.timer);
    state.timer = null;
  }
  state.requestedConfigs = configs;

  const renderedStars = controller.objectsToRender as Star[];
  const stars = configs.map((config) =>
    renderedStars.find((star) =>
      star.id === config.id && star.mesh && !star.mesh.isDisposed()
    )
  );

  const updateRenderedStars = () => {
    controller.setObjectsToRender(scene, stars.filter((star): star is Star => !!star));
    controller.activeStar = stars[0] ?? null;
  };

  controller.activeStarConfig = configs[0] ?? null;
  updateRenderedStars();

  const loadState = state;
  let loadedCount = 0;
  const loadNextStar = () => {
    loadState.timer = null;
    if (scene.isDisposed) {
      return;
    }

    const index = stars.findIndex((star) => !star);
    if (index === -1) {
      return;
    }

    stars[index] = createStars(scene, [configs[index]])[0];
    loadedCount++;
    updateRenderedStars();
    if (stars.some((star) => !star)) {
      const interval = Math.min(
        MAX_STAR_LOAD_INTERVAL_MS,
        INITIAL_STAR_LOAD_INTERVAL_MS * (1 + Math.max(0, loadedCount - FAST_STAR_COUNT + 1))
      );
      loadState.timer = setTimeout(loadNextStar, interval);
    }
  };

  loadNextStar();
}
