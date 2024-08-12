import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface HomeScreenState {
  currentNode: MemodotFile;
  previousNode?: MemodotFile;
}

const initialState: HomeScreenState = {
  currentNode: "root",
  previousNode: undefined,
};

export const homeScreenStateSlice = createSlice({
  name: "homeScreenState",
  initialState,
  reducers: {
    goNextNode: (state, action: PayloadAction<Node>) => {
      const nextPreviousNode = state.currentNode;
      console.log(`New node is 👉 ${action.payload}`);
      state.currentNode = action.payload;
      state.previousNode = nextPreviousNode;
    },

    gotBackTo: (state) => {
      const nextPreviousNode = state.currentNode;
      console.log(`Go back to 👉 ${state.previousNode}`);
      const safeNextNode =
        state.previousNode != null ? state.previousNode! : "root";
      state.currentNode = safeNextNode;
      state.previousNode = nextPreviousNode;
    },
  },
});

// Export the generated action creators for use in components
export const { goNextNode, gotBackTo } = homeScreenStateSlice.actions;

// Export the slice reducer for use in the store configuration
export default homeScreenStateSlice.reducer;
