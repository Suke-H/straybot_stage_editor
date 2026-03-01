import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellKey } from "@/types/cell";
import { CellTypeState } from "@/types/store/states";

const initialState: CellTypeState = {
  selectedCellType: "White",
};

export const cellTypeSlice = createSlice({
  name: "cellType",
  initialState,
  reducers: {
    changeCellType: (state, action: PayloadAction<CellKey>) => {
      state.selectedCellType = action.payload;
    },
  },
});

export default cellTypeSlice.reducer;
