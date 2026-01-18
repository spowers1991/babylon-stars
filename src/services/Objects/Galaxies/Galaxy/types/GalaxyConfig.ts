import { StarData } from "@/services/Objects/Stars/Star/types/StarData";

export interface GalaxyConfig{
  id: number;          
  name?: string;
  stars?: StarData[];
}
