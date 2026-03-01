import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StartAndGoal, Position } from "@/types/start-and-goal";

interface StartAndGoalState {
  startAndGoal: StartAndGoal;
  selectingTarget: "start" | "goal" | null;
}

const initialState: StartAndGoalState = {
  startAndGoal: { start: null, goal: null },
  selectingTarget: null,
};

export const startAndGoalSlice = createSlice({
  name: "startAndGoal",
  initialState,
  reducers: {
    setSelectingTarget: (state, action: PayloadAction<"start" | "goal" | null>) => {
      state.selectingTarget = action.payload;
    },
    setPosition: (state, action: PayloadAction<{ target: "start" | "goal"; y: number; x: number }>) => {
      const { target, y, x } = action.payload;
      const pos: Position = { y, x };
      if (target === "start") state.startAndGoal.start = pos;
      else state.startAndGoal.goal = pos;
      state.selectingTarget = null;
    },
    clearAll: (state) => {
      state.startAndGoal = { start: null, goal: null };
      state.selectingTarget = null;
    },
  },
});

export default startAndGoalSlice.reducer;
