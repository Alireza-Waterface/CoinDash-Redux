import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Coin } from "../../types/coin";

const API_KEY = import.meta.env.VITE_CG_API_KEY;
const BASE_URL = import.meta.env.VITE_CG_BASE_URL;

export interface MarketChartData {
   prices: [number, number][]; // [timestamp, price]
}

// Isolate the query params logic for reusability
const getCommonHeaders = () => {
   // CoinGecko Demo API expects key as query param, but we can structure this cleanly
   return {
      x_cg_demo_api_key: API_KEY,
   };
};

export const marketApi = createApi({
   reducerPath: "marketApi",
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
   // Caching tags (useful for invalidating data later)
   tagTypes: ["Market"],
   endpoints: (builder) => ({
      // Fetch Top Coins (Market Data)
      getTopCoins: builder.query<Coin[], number | void>({
         query: (limit = 20) => ({
            url: "/coins/markets",
            params: {
               ...getCommonHeaders(),
               vs_currency: "usd",
               order: "market_cap_desc",
               per_page: limit,
               page: 1,
               sparkline: false,
            },
         }),
         // Cache data for 60 seconds to prevent spamming API on re-renders
         keepUnusedDataFor: 60,
         providesTags: ["Market"],
      }),

      // Fetch specific coin details (Useful for refreshing portfolio prices specifically)
      getIdsPrices: builder.query<Coin[], string[]>({
         query: (ids) => ({
            url: "/coins/markets",
            params: {
               ...getCommonHeaders(),
               vs_currency: "usd",
               ids: ids.join(","),
            },
         }),
      }),

      getMarketChart: builder.query<MarketChartData, string>({
         query: (coinId) => ({
            url: `/coins/${coinId}/market_chart`,
            params: {
               ...getCommonHeaders(),
               vs_currency: "usd",
               days: "7", // Fetch last 7 days
               interval: "daily",
            },
         }),
         keepUnusedDataFor: 300, // Cache for 5 minutes
      }),
   }),
});

// Export hooks for usage in functional components
export const {
   useGetTopCoinsQuery,
   useGetIdsPricesQuery,
   useGetMarketChartQuery,
} = marketApi;
