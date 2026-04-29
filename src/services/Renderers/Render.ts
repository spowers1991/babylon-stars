import { renderCamera as camera } from "./actions/create/renderCamera";
import { renderStars as stars} from "./actions/create/renderStars";
import { renderSPS as particles } from "./actions/create/renderSPS";
import { renderPostProcessing as postProcessing } from "./actions/create/renderPostProcessing";

export const Render = {
	camera,
	stars,
	particles,
	postProcessing
};
