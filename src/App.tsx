import {
   createBrowserRouter,
   RouterProvider,
   Navigate,
} from "react-router-dom";

import { lazy } from "react";

import { AppLayout } from "./components/layout/AppLayout";
const MarketPage = lazy(() => import("./pages/MarketPage"));
const CoinDetailPage = lazy(() => import("./pages/CoinDetailPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));

const router = createBrowserRouter([
   {
      path: "/",
      element: <AppLayout />,
      children: [
         {
            index: true,
            element: <MarketPage />,
         },
         {
            path: "portfolio",
            element: <PortfolioPage />,
         },
         {
            path: "coin/:id",
            element: <CoinDetailPage />,
         },
         {
            path: "*",
            element: <Navigate to="/" replace />,
         },
      ],
   },
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
