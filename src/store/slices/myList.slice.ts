import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MyListState {
  ids: string[];
  reminders: string[];
}

const initialState: MyListState = {
  ids: [],
  reminders: [],
};

const myListSlice = createSlice({
  name: "myList",
  initialState,
  reducers: {
    toggleSaved(state, action: PayloadAction<string>) {
      const idx = state.ids.indexOf(action.payload);
      if (idx >= 0) state.ids.splice(idx, 1);
      else state.ids.push(action.payload);
    },
    toggleReminder(state, action: PayloadAction<string>) {
      const idx = state.reminders.indexOf(action.payload);
      if (idx >= 0) state.reminders.splice(idx, 1);
      else state.reminders.push(action.payload);
    },
  },
});

export const { toggleSaved, toggleReminder } = myListSlice.actions;
export default myListSlice.reducer;
