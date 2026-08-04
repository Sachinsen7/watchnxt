import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthUser {
  id: string;
  name: string;
  tier: "Free" | "Pro Member";
}

interface AuthState {
  isAuthenticated: boolean;
  pendingIdentifier: string | null;
  maskedTarget: string | null;
  user: AuthUser | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  pendingIdentifier: null,
  maskedTarget: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    otpSent(state, action: PayloadAction<{ identifier: string; maskedTarget: string }>) {
      state.pendingIdentifier = action.payload.identifier;
      state.maskedTarget = action.payload.maskedTarget;
    },
    otpVerified(state, action: PayloadAction<AuthUser>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.pendingIdentifier = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.pendingIdentifier = null;
      state.maskedTarget = null;
    },
  },
});

export const { otpSent, otpVerified, logout } = authSlice.actions;
export default authSlice.reducer;
