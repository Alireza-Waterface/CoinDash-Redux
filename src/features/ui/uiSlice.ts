import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";
import { type RootState } from "../../app/store";

export type ToastType = "success" | "error" | "info";
export type Theme = "dark" | "light";

export interface Toast {
   id: string;
   message: string;
   type: ToastType;
}

interface UiState {
   toasts: Toast[];
   theme: Theme;
}

const savedTheme = localStorage.getItem("theme") as Theme | null;

const initialState: UiState = {
   toasts: [],
   theme: savedTheme || "dark",
};

export const uiSlice = createSlice({
   name: "ui",
   initialState,
   reducers: {
      toggleTheme: (state) => {
         state.theme = state.theme === "dark" ? "light" : "dark";
         localStorage.setItem("theme", state.theme);
      },
      addToast: {
         reducer: (state, action: PayloadAction<Toast>) => {
            state.toasts.push(action.payload);
         },
         prepare: (message: string, type: ToastType = "info") => {
            return { payload: { id: nanoid(), message, type } };
         },
      },
      removeToast: (state, action: PayloadAction<string>) => {
         state.toasts = state.toasts.filter((t) => t.id !== action.payload);
      },
   },
});

export const { addToast, removeToast, toggleTheme } = uiSlice.actions;

export const selectToasts = (state: RootState) => state.ui.toasts;
export const selectTheme = (state: RootState) => state.ui.theme;

export default uiSlice.reducer;
