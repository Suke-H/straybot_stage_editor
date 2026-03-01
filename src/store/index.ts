import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import studioModeReducer from "./slices/studio-mode-slice";
import studioModeInEditorReducer from "./slices/studio-mode-in-editor-slice";
import cellTypeReducer from "./slices/cell-type-slice";
import panelListReducer from "./slices/panel-list-slice";
import panelPlacementReducer from "./slices/panel-placement-slice";
import gridReducer from "./slices/grid-slice";
import swapReducer from "./slices/swap-slice";
import startAndGoalReducer from "./slices/start-and-goal-slice";

export const store = configureStore({
  reducer: {
    studioMode: studioModeReducer,
    studioModeInEditor: studioModeInEditorReducer,
    cellType: cellTypeReducer,
    panelList: panelListReducer,
    panelPlacement: panelPlacementReducer,
    grid: gridReducer,
    swap: swapReducer,
    startAndGoal: startAndGoalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
