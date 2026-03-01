import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cell, CellKey } from "@/types/cell";
import { Grid } from "@/types/grid";
import { GridState } from "@/types/store/states";
import { Path } from "@/types/path";

const WHITE: Cell = { type: "White" };

const initialState: GridState = {
  grid: [
    [WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE],
  ],
  gridHistory: [],
  phaseHistory: [],
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    initGrid: (state) => {
      state.grid = [
        [WHITE, WHITE, WHITE],
        [WHITE, WHITE, WHITE],
        [WHITE, WHITE, WHITE],
      ];
    },

    loadGrid: (state, action: PayloadAction<Grid>) => {
      state.grid = action.payload;
    },

    addToRow: (state, action: PayloadAction<{ isFirst: boolean }>) => {
      const newRow = Array(state.grid[0].length).fill(WHITE);
      if (action.payload.isFirst) state.grid.unshift(newRow);
      else state.grid.push(newRow);
    },
    addToCol: (state, action: PayloadAction<{ isFirst: boolean }>) => {
      if (action.payload.isFirst)
        state.grid = state.grid.map((row) => [WHITE, ...row]);
      else
        state.grid = state.grid.map((row) => [...row, WHITE]);
    },
    removeFromRow: (state, action: PayloadAction<{ isFirst: boolean }>) => {
      if (action.payload.isFirst) state.grid.shift();
      else state.grid.pop();
    },
    removeFromCol: (state, action: PayloadAction<{ isFirst: boolean }>) => {
      if (action.payload.isFirst)
        state.grid = state.grid.map((row) => row.slice(1));
      else
        state.grid = state.grid.map((row) => row.slice(0, -1));
    },

    placeCell: (state, action: PayloadAction<{ row: number; col: number; cell: Cell }>) => {
      const { row, col, cell } = action.payload;
      state.grid[row][col] = cell;
    },

    initHistory: (state) => {
      state.gridHistory = [state.grid.map((row) => row.map((cell) => ({ ...cell })))];
    },
    saveHistory: (state) => {
      state.gridHistory.push(state.grid.map((row) => row.map((cell) => ({ ...cell }))));
    },
    undo: (state) => {
      if (state.gridHistory.length >= 2) {
        state.grid = state.gridHistory[state.gridHistory.length - 1];
        state.gridHistory.pop();
      }
    },
    reset: (state) => {
      if (state.gridHistory.length >= 2) {
        state.grid = state.gridHistory[0];
        state.gridHistory = state.gridHistory.slice(0, 1);
      }
    },

    initPhaseHistory: (state) => {
      state.phaseHistory = [state.grid.map((row) => row.map((cell) => ({ ...cell })))];
    },
    savePhaseHistory: (state) => {
      state.phaseHistory.push(state.grid.map((row) => row.map((cell) => ({ ...cell }))));
    },
    resetPhase: (state) => {
      if (state.phaseHistory.length >= 2) {
        state.grid = state.phaseHistory[0];
        state.phaseHistory = state.phaseHistory.slice(0, 1);
      }
    },

    placeFootprints: (state, action: PayloadAction<{ path: Path }>) => {
      const { path } = action.payload;
      for (let i = 1; i < path.length - 1; i++) {
        const prev = path[i - 1];
        const curr = path[i];
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;

        let footprintType: CellKey | null = null;
        if (dx === 1 && dy === 0) footprintType = "FootRight";
        else if (dx === -1 && dy === 0) footprintType = "FootLeft";
        else if (dx === 0 && dy === 1) footprintType = "FootDown";
        else if (dx === 0 && dy === -1) footprintType = "FootUp";

        if (footprintType) {
          state.grid[curr.y][curr.x] = { type: footprintType };
        }
      }
    },

    replaceGrid: (state, action: PayloadAction<Grid>) => {
      state.grid = action.payload;
    },
  },
});

export default gridSlice.reducer;
