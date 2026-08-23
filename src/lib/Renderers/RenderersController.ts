import { runRenderers as _runRenderers } from "./actions/run/runRenderers";
import { addRenderer as addRendererAction } from "./actions/set/addRenderer";
import { getRenderers as getRenderersAction } from "./actions/get/getRenderers";
import { stepUpdate as stepUpdateAction } from "./actions/create/stepUpdate";
import { stepUpdateAll as stepUpdateAllAction } from "./actions/create/stepUpdateAll";
import { logRenderers as logRenderersAction } from "./actions/logRenderers";
import type { RendererConfig } from "./types/RendererConfig";

export class RenderersController {
	static runRenderers = _runRenderers;
	static renderers: RendererConfig[] = [];
	static lastUpdates: Record<string, number> = {};

	static addRenderer(config: RendererConfig) {
		addRendererAction(RenderersController.renderers, config);
	}

	static getRenderers() {
		return getRenderersAction(RenderersController.renderers);
	}

	static stepUpdate(config: RendererConfig, deltaMs: number) {
		addRendererAction(RenderersController.renderers, config);
		stepUpdateAction(config, deltaMs, RenderersController.lastUpdates);
	}

	static stepUpdateAll(deltaMs: number) {
		stepUpdateAllAction(RenderersController.renderers, deltaMs, RenderersController.lastUpdates);
	}

	static logRenderers() {
		logRenderersAction(RenderersController.renderers);
		console.log(RenderersController.renderers);
	}
}
