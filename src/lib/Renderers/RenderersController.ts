import { runLoop as _runLoop } from "./actions/runLoop";
import { addRenderer as addRendererAction } from "./actions/addRenderer";
import { getRenderers as getRenderersAction } from "./actions/getRenderers";
import { stepUpdate as stepUpdateAction } from "./actions/stepUpdate";
import { stepUpdateAll as stepUpdateAllAction } from "./actions/stepUpdateAll";
import { logRenderers as logRenderersAction } from "./actions/logRenderers";
import type { RendererConfig } from "./types/RendererConfig";

export class RenderersController {
	static runLoop = _runLoop;
	static renderers: RendererConfig[] = [];
	static lastUpdates: Record<string, number> = {};

	static addRenderer(config: RendererConfig) {
		addRendererAction(RenderersController.renderers, config);
	}

	static getRenderers() {
		return getRenderersAction(RenderersController.renderers);
	}

	static stepUpdate(config: RendererConfig) {
        addRendererAction(RenderersController.renderers, config);
		stepUpdateAction(config, RenderersController.lastUpdates);
	}

	static stepUpdateAll() {
		stepUpdateAllAction(RenderersController.renderers, RenderersController.lastUpdates);
	}

	static logRenderers() {
		logRenderersAction(RenderersController.renderers);
		console.log(RenderersController.renderers);
	}
}
