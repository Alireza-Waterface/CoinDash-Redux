import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Asset {
   id: string; // e.g., 'bitcoin'
   quantity: number; // e.g., 0.5
}

interface PortfolioState {
   assets: Asset[];
}

const initialState: PortfolioState = {
   assets: [],
};

export const portfolioSlice = createSlice({
   name: "portfolio",
   initialState,
   reducers: {
      buyAsset: (state, action: PayloadAction<Asset>) => {
         const { id, quantity } = action.payload;
         const existingAsset = state.assets.find((asset) => asset.id === id);

         if (existingAsset) {
            // If we already own this coin, just add to the pile
            existingAsset.quantity += quantity;
         } else {
            // Otherwise, add it as a new asset
            state.assets.push({ id, quantity });
         }
      },
      sellAsset: (state, action: PayloadAction<Asset>) => {
         const { id, quantity } = action.payload;
         const existingAsset = state.assets.find((asset) => asset.id === id);

         if (existingAsset) {
            existingAsset.quantity -= quantity;
            // Remove the asset if quantity hits 0 or less
            if (existingAsset.quantity <= 0) {
               state.assets = state.assets.filter((asset) => asset.id !== id);
            }
         }
      },
   },
});

export const { buyAsset, sellAsset } = portfolioSlice.actions;

// Selector to get raw assets
export const selectAssets = (state: RootState) => state.portfolio.assets;

export default portfolioSlice.reducer;
