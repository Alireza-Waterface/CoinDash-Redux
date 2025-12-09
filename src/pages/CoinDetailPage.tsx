import { useParams, useNavigate } from "react-router-dom";
import { useGetTopCoinsQuery } from "../features/market/marketApi";
import { PriceChart } from "../components/market/PriceChart";
import { TradeForm } from "../features/portfolio/TradeForm";
import { Loader } from "../components/ui/Loader";

export default function CoinDetailPage() {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();

   const { coin, isLoading } = useGetTopCoinsQuery(50, {
      selectFromResult: ({ data, isLoading }) => ({
         coin: data?.find((c) => c.id === id),
         isLoading,
      }),
   });

   if (isLoading) return <Loader />;
   if (!coin) return <div className="text-center mt-10">Coin not found</div>;

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <button
            onClick={() => navigate(-1)}
            className="text-slate-500 hover:text-red-500 mb-4 flex items-center gap-2 cursor-pointer"
         >
            ← Back
         </button>

         <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center gap-4">
               <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-16 h-16 rounded-full shadow-lg"
               />
               <div>
                  <h1 className="text-xl font-bold dark:text-white md:text-2xl lg:text-3xl">
                     {coin.name}
                  </h1>
                  <div className="flex items-center gap-3">
                     <span className="text-md font-mono dark:text-slate-200 md:text-xl lg:text-2xl">
                        ${coin.current_price.toLocaleString()}
                     </span>
                     <span
                        className={`px-2 py-1 rounded text-sm font-bold ${
                           coin.price_change_percentage_24h >= 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                        }`}
                     >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                     </span>
                  </div>
               </div>
            </div>

            <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
               7 Day Trend
            </h2>
         </div>

         <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
               <PriceChart coinId={coin.id} />
               <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 sm:p-4">
                     <p className="text-slate-500 text-sm">Market Cap</p>
                     <p className="text-md font-bold dark:text-white md:text-xl lg:text-2xl">
                        ${coin.market_cap.toLocaleString()}
                     </p>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 sm:p-4">
                     <p className="text-slate-500 text-sm">24h High</p>
                     <p className="text-md font-bold dark:text-white md:text-xl lg:text-2xl">
                        ${coin.high_24h.toLocaleString()}
                     </p>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 h-fit sm:p-4">
               <h2 className="text-xl font-bold mb-4 dark:text-white">
                  Trade {coin.symbol.toUpperCase()}
               </h2>
               <TradeForm
                  coin={coin}
                  onSuccess={() => {}} // No need to close modal here, it's inline
               />
            </div>
         </div>
      </div>
   );
}
