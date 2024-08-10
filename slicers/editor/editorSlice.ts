import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

export interface EditorState {
  id?: number;
  text: string;
  isPreview: boolean;
  createdAt: number;
  updatedAt: number;
}

const initialState: EditorState = {
  id: undefined,
  text: "",
  isPreview: false,
  createdAt: 0,
  updatedAt: 0,
};

export const doAsync = createAsyncThunk(
  "editor/AsyncSomething",
  async (data: number) => {
    // const response = await fetchCount(amount);
    // The following execution is pesudu async duration
    // const response = await new Promise<void>((resolve) =>
    //   setTimeout(resolve, 2000)
    // );
    // The value we return becomes the `fulfilled` action payload
    return data;
  }
);

export const editorSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      console.log("New text is 👉 ", action.payload);
      state.text = action.payload;
    },

    setUpdatedAt: (state, action: PayloadAction<number>) => {
      state.updatedAt = action.payload;
    },

    setCreatedAt: (state, action: PayloadAction<number>) => {
      state.createdAt = action.payload;
    },

    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },

    setIsPreview: (state, action: PayloadAction<boolean>) => {
      state.isPreview = action.payload;
    },
  },
});

// If you want to check current state
// export const ifYouWantToUseCurrentState = (amount: number): AppThunk => {
//   return (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
// };

//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         state.value += action.payload;
//       })
//       .addCase(incrementAsync.rejected, (state) => {
//         state.status = "failed";
//       });
//   },
// });

// Define selector
export const selectId = (state: RootState) => state.editor.id;
export const selectText = (state: RootState) => state.editor.text;

// Export the generated action creators for use in components
export const { setText, setCreatedAt, setUpdatedAt, setId, setIsPreview } =
  editorSlice.actions;

// Export the slice reducer for use in the store configuration
export default editorSlice.reducer;
