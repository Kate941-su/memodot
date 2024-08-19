import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IStack, CustomStack } from "../../classes/stack";

export interface HomeScreenState {
  stack: IStack<MemodotFile>;
}

const dummyChildItem = [
  {
    id: 83,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_83",
    text: "Hello id 83",
    parentFolderId: 1,
    children: [] as MemodotFile[],
    isRootFolder: false,
  },
  {
    id: 942,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_942",
    isFolder: true,
    children: [] as MemodotFile[],
    isRootFolder: false,
    parentFolderId: 1,
  },
  {
    id: 1340,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_942",
    text: "Hello id 942",
    isRootFolder: false,
    parentFolderId: 1,
  },
];

const initDummyList = [
  {
    id: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_1",
    isFolder: true,
    parentFolderid: 1,
    isRootFolder: false,
    children: dummyChildItem,
  },
  {
    id: 2,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_2",
    isFolder: true,
    isRootFolder: false,
    children: dummyChildItem,
  },
  {
    id: 3,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    isRootFolder: false,
    fileName: "id_3",
    text: "Hello id 3",
  },
  {
    id: 4,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_4",
    isFolder: true,
    isRootFolder: false,
    children: dummyChildItem,
  },
  {
    id: 5,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_5",
    isFolder: true,
    isRootFolder: false,
    children: dummyChildItem,
  },
  {
    id: 6,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_6",
    text: "Hello id 6",
    isRootFolder: false,
  },
  {
    id: 7,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_7",
    text: "Hello id 7",
    isRootFolder: false,
  },
  {
    id: 8,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_8",
    text: "Hello id 8",
    isRootFolder: false,
  },
  {
    id: 9,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_9",
    isFolder: true,
    isRootFolder: false,
    children: dummyChildItem,
  },
  {
    id: 10,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_10",
    isRootFolder: false,
    text: "Hello id 10",
  },
];

const initStack = new CustomStack<MemodotFile>([
  {
    id: 0,
    createdAt: 0,
    updatedAt: 0,
    isFolder: true,
    parentFolderId: undefined,
    fileName: "root",
    text: undefined,
    children: initDummyList,
    isRootFolder: true,
  },
]);

const initialState: HomeScreenState = {
  stack: initStack,
};

export const homeScreenStateSlice = createSlice({
  name: "homeScreenState",
  initialState,
  reducers: {
    goNext: (state, action: PayloadAction<MemodotFile>) => {
      const newStack = new CustomStack<MemodotFile>(state.stack.asList);
      newStack.push(action.payload);
      state.stack = newStack;
      console.log(
        `[homescreenSlice] Current stack is 👉 ${state.stack.asList.map(
          (it) => it.fileName
        )}`
      );
    },

    gotBack: (state) => {
      const newStack = new CustomStack<MemodotFile>(state.stack.asList);
      const popedFile = newStack.pop();
      console.log(`Poped file id 👉 ${popedFile?.id}`);
      console.log(
        `[homescreenSlice] Current stack is 👉 ${state.stack.asList.map(
          (it) => it.fileName
        )}`
      );
      console.log(`Next file id 👉 ${state.stack.top?.id}`);
      state.stack = newStack;
    },

    delete: (state, action: PayloadAction<number>) => {
      const newChildren = state.stack.top?.children?.filter((it) => {
        if (it.id != action.payload) {
          console.log(`Deleted file 👉 ${it.fileName}`);
        }
        return it.id != action.payload;
      });
      const newStack = new CustomStack<MemodotFile>(newChildren);
      state.stack = newStack;
    },
  },
});

// Export the generated action creators for use in components
export const { goNext, gotBack } = homeScreenStateSlice.actions;

export const selectCurrentFile = (state: RootState) =>
  state.homeScreenState.stack.top!;

// Export the slice reducer for use in the store configuration
export default homeScreenStateSlice.reducer;
