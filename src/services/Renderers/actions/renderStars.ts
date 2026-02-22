import { RenderersController } from "@/lib/Renderers/RenderersController";
import type { StarsController } from "@/services/Objects/Stars/StarsController";

export function renderStars(starsController: StarsController) {
  return () => RenderersController.stepUpdate({
    id: "starUpdate",
    name: "Star Update",
    interval: 500,
    step: () => {
      console.log("Updating stars...");
      starsController.updateStars(starsController.stars);
    },
  });
}
