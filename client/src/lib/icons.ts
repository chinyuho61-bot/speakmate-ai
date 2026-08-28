import { UserCircle, UtensilsCrossed, Briefcase, Presentation, Map } from "lucide-react";
import type { ScenarioIcon } from "@shared/types";

export const scenarioIconMap: Record<ScenarioIcon, typeof UserCircle> = {
  "user-circle": UserCircle,
  "fork-knife": UtensilsCrossed,
  briefcase: Briefcase,
  "presentation-chart": Presentation,
  "map-trifold": Map,
};
