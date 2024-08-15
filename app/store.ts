import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slicers/counter/counterSlice";
import editorReducer from "../slicers/editor/editorSlice";
import homeScreenStateReducer from "../slicers/homeScreen/homeScreenSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editor: editorReducer,
    homeScreenState: homeScreenStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
