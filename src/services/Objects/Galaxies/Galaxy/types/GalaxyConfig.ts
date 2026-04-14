import { StarConfig } from "@/services/Objects/Stars/Star/types/StarConfig";
import { StarData } from "@/services/Objects/Stars/Star/types/StarData";

export interface GalaxyConfig{
  id: number;          
  name?: string;
  starsData?: StarData[];
  starsConfigs?: StarConfig[];
}
