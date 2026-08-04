import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SportId } from "@/types/content";

export type BgTheme = "black" | "purple";

interface UiState {
  sidebarCollapsed: boolean;
  bgTheme: BgTheme;
  activeSportFilter: SportId | "all";
}

const initialState: UiState = {
  sidebarCollapsed: true,
  bgTheme: "black",
  activeSportFilter: "all",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    setBgTheme(state, action: PayloadAction<BgTheme>) {
      state.bgTheme = action.payload;
    },
    setSportFilter(state, action: PayloadAction<SportId | "all">) {
      state.activeSportFilter = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, setBgTheme, setSportFilter } = uiSlice.actions;
export default uiSlice.reducer;
