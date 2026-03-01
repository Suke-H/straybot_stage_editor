import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cell } from "@/types/cell";
import { CreatePanelState } from "@/types/store/states";

const WHITE: Cell = { type: "White" };
const BLACK: Cell = { type: "Black" };

const initialState: CreatePanelState = {
  newPanelGrid: Array(3).fill(null).map(() => Array(3).fill(WHITE)),
};

export const createPanelSlice = createSlice({
  name: "create-panel",
  initialState,
  reducers: {
    initPanelGrid: (state) => {
      state.newPanelGrid = Array(3).fill(null).map(() => Array(3).fill(WHITE));
    },
    addToRow: (state) => {
      state.newPanelGrid.push(Array(state.newPanelGrid[0].length).fill(WHITE));
    },
    addToCol: (state) => {
      state.newPanelGrid = state.newPanelGrid.map((row) => [...row, WHITE]);
    },
    removeFromRow: (state) => {
      state.newPanelGrid.pop();
    },
    removeFromCol: (state) => {
      state.newPanelGrid = state.newPanelGrid.map((row) => row.slice(0, row.length - 1));
    },
    clickToCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;
      const current = state.newPanelGrid[row][col];
      state.newPanelGrid[row][col] = current.type === "Black" ? WHITE : BLACK;
    },
  },
});

export default createPanelSlice.reducer;
