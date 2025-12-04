import { StarData } from "@/services/Objects/Stars/Star/types/StarData";

export interface Galaxy{
  id: number;          
  name?: string;
  stars?: StarData[];
}
