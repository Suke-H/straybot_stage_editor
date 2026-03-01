import { Grid } from '@/types/grid';
import { Panel } from '@/types/panel';

export interface IPanelStrategy {
  canPlace(grid: Grid, rowIdx: number, colIdx: number, panel: Panel): boolean;
  applyEffect(grid: Grid, rowIdx: number, colIdx: number, panel: Panel): [Grid, undefined?, { swapAction?: string; pos?: { row: number; col: number } }?];
}
