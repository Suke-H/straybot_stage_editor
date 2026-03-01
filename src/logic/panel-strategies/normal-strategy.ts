import { Grid } from '@/types/grid';
import { Panel } from '@/types/panel';
import { IPanelStrategy } from './types';
import { deepCopyGrid } from '../utils';

export class NormalPanelStrategy implements IPanelStrategy {
  canPlace(grid: Grid, rowIdx: number, colIdx: number, panel: Panel): boolean {
    for (let i = 0; i < panel.cells.length; i++) {
      for (let j = 0; j < panel.cells[0].length; j++) {
        if (grid[rowIdx + i][colIdx + j].type !== "Normal") {
          return false;
        }
      }
    }
    return true;
  }

  applyEffect(grid: Grid, rowIdx: number, colIdx: number, panel: Panel): [Grid, undefined, undefined] {
    const newGrid = deepCopyGrid(grid);

    for (let i = 0; i < panel.cells.length; i++) {
      for (let j = 0; j < panel.cells[0].length; j++) {
        const panelCell = panel.cells[i][j];
        if (panelCell.type !== "Normal") {
          newGrid[rowIdx + i][colIdx + j] = { ...panelCell };
        }
      }
    }

    return [newGrid, undefined, undefined];
  }
}
