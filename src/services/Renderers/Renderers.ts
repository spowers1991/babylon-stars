import { renderStars } from "./actions/create/renderStars";
import { renderSPS } from "./actions/create/renderSPS";
import { renderPostProcessing } from "./actions/create/renderPostProcessing";

export const Renderers = {
	stars: renderStars,
	particles: renderSPS,
	postProcessing: renderPostProcessing
};
