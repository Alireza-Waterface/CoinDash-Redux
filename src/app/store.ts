import { configureStore } from "@reduxjs/toolkit";
import { marketApi } from "../features/market/marketApi";
import portfolioReducer from "../features/portfolio/portfolioSlice";
import uiReducer from "../features/ui/uiSlice";

// 1. Helper to load state
const loadState = () => {
   try {
      const serializedState = localStorage.getItem("portfolio");
      if (serializedState === null) {
         return undefined;
      }
      return { portfolio: JSON.parse(serializedState) };
   } catch (err) {
      return undefined;
   }
};

// 2. Helper to save state
const saveState = (state: any) => {
   try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("portfolio", serializedState);
   } catch {
      // Ignore write errors
   }
};

export const store = configureStore({
   reducer: {
      [marketApi.reducerPath]: marketApi.reducer,
      portfolio: portfolioReducer,
      ui: uiReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(marketApi.middleware),
   // 3. Load initial state here
   preloadedState: loadState(),
});

// 4. Subscribe to store changes
store.subscribe(() => {
   // Only save the portfolio slice, not the whole store (we don't want to cache API data this way)
   saveState(store.getState().portfolio);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
