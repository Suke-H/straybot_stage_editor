import { IPanelStrategy } from "./types";
import { NormalPanelStrategy } from "./normal-strategy";

export const getStrategy = (panelType?: string): IPanelStrategy => {
  switch (panelType) {
    case "Normal":
    case undefined:
      return new NormalPanelStrategy();
    case "Cut":
      return new NormalPanelStrategy();
    case "Swap":
      return new NormalPanelStrategy();
    case "SwapSecond":
      return new NormalPanelStrategy();
    default:
      throw new Error(`Unknown panel type: ${panelType}`);
  }
};
