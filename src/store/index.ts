import { configureStore } from "@reduxjs/toolkit";
import { contentApi } from "./api/contentApi";
import { authApi } from "./api/authApi";
import uiReducer from "./slices/ui.slice";
import authReducer from "./slices/auth.slice";
import myListReducer from "./slices/myList.slice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    myList: myListReducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contentApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
