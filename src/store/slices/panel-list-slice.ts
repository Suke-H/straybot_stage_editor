import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Panel } from "@/types/panel";
import { PanelListState } from "@/types/store/states";

const initialState: PanelListState = {
  panels: [
    {
      id: "panel1",
      cells: [
        [{ type: "Black" }, { type: "Black" }],
        [{ type: "Black" }, { type: "Black" }],
      ],
    },
    {
      id: "panel2",
      cells: [
        [{ type: "Black" }, { type: "White" }],
        [{ type: "White" }, { type: "Black" }],
      ],
    },
  ],
  removedPanels: [],
};

export const panelListSlice = createSlice({
  name: "panel-list",
  initialState,
  reducers: {
    loadPanels: (state, action: PayloadAction<Panel[]>) => {
      state.panels = action.payload;
    },
    createPanel: (state, action: PayloadAction<Panel>) => {
      state.panels.push(action.payload);
    },
    removePanel: (state, action: PayloadAction<string>) => {
      state.panels = state.panels.filter((panel) => panel.id !== action.payload);
    },
    placePanel: (state, action: PayloadAction<Panel>) => {
      const index = state.panels.findIndex((panel) => panel.id === action.payload.id);
      if (index !== -1) {
        state.removedPanels.push({ panel: action.payload, index });
        state.panels.splice(index, 1);
      }
    },
    undo: (state) => {
      const lastRemoved = state.removedPanels.pop();
      if (lastRemoved) {
        state.panels.splice(lastRemoved.index, 0, lastRemoved.panel);
      }
    },
    reset: (state) => {
      while (state.removedPanels.length > 0) {
        const lastRemoved = state.removedPanels.pop();
        if (lastRemoved) {
          state.panels.splice(lastRemoved.index, 0, lastRemoved.panel);
        }
      }
    },
  },
});

export default panelListSlice.reducer;
