import { Vector } from '@/types/path';
import { Cell } from '@/types/cell';

export interface Panel {
  id: string;
  cells: Cell[][];
  type?: "Normal" | "Cut" | "Swap" | "SwapSecond";
}

export type PanelPlacement = {
  panel: Panel;
  highlight: Vector;
  point: Vector;
};
