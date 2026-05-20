import { renderStars as stars} from "./actions/create/renderStars";
import { renderSPS as particles } from "./actions/create/renderSPS";
import { renderPostProcessing as postProcessing } from "./actions/create/renderPostProcessing";

export const Renderers = {
	stars,
	particles,
	postProcessing
};
