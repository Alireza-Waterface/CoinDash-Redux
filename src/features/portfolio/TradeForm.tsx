import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { buyAsset, sellAsset } from "./portfolioSlice";
import { addToast } from "../ui/uiSlice";
import type { Coin } from "../../types/coin";

interface TradeFormProps {
   coin: Coin;
   onSuccess: () => void;
   initialMode?: "buy" | "sell";
}

export const TradeForm = ({
   coin,
   onSuccess,
   initialMode = "buy",
}: TradeFormProps) => {
   const [mode, setMode] = useState<"buy" | "sell">(initialMode);
   const [amount, setAmount] = useState<number>(0);
   const dispatch = useAppDispatch();

   // Find how much we currently own to validate sell
   const currentAsset = useAppSelector((state) =>
      state.portfolio.assets.find((a) => a.id === coin.id)
   );
   const ownedQuantity = currentAsset?.quantity || 0;

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!amount || amount <= 0) return;

      if (mode === "buy") {
         dispatch(buyAsset({ id: coin.id, quantity: amount }));
         dispatch(
            addToast(`Bought ${amount} ${coin.symbol.toUpperCase()}`, "success")
         );
         setAmount(0);
      } else {
         if (amount > ownedQuantity) {
            dispatch(
               addToast(
                  `Insufficient balance. You have ${ownedQuantity}`,
                  "error"
               )
            );
            return;
         }
         dispatch(sellAsset({ id: coin.id, quantity: amount }));
         dispatch(
            addToast(`Sold ${amount} ${coin.symbol.toUpperCase()}`, "info")
         );
      }

      onSuccess();
   };

   return (
      <div className="space-y-4">
         {/* Toggle Switch */}
         <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg mb-6">
            <button
               onClick={() => setMode("buy")}
               className={`flex-1 py-2 rounded-md font-medium text-sm transition-all ${
                  mode === "buy"
                     ? "bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400"
                     : "text-slate-500"
               }`}
            >
               Buy
            </button>
            <button
               onClick={() => setMode("sell")}
               className={`flex-1 py-2 rounded-md font-medium text-sm transition-all ${
                  mode === "sell"
                     ? "bg-white dark:bg-slate-700 shadow text-red-600 dark:text-red-400"
                     : "text-slate-500"
               }`}
            >
               Sell
            </button>
         </div>

         <div className="flex items-start gap-4">
            <img src={coin.image} alt={coin.name} className="w-12 h-12" />
            <div>
               <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {coin.name}
               </h3>
               <p className="text-sm text-slate-500 dark:text-slate-400">
                  Price: ${coin.current_price.toLocaleString()}
               </p>
               {mode === "sell" && (
                  <p className="text-xs text-slate-500 mt-1">
                     Available:{" "}
                     <span className="font-bold">{ownedQuantity}</span>
                  </p>
               )}
            </div>
         </div>

         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  {mode === "buy" ? "Amount to Buy" : "Amount to Sell"}
               </label>
               <div className="relative">
                  <input
                     type="number"
                     inputMode="numeric"
                     step="0.01"
                     key={`input-${mode}`}
                     value={amount}
                     onChange={(e) => setAmount(+e.target.value)}
                     className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                     placeholder="0.00"
                  />
                  <span className="absolute right-8 top-3.5 text-sm text-slate-400 uppercase font-bold">
                     {coin.symbol}
                  </span>
               </div>
            </div>

            {amount > 0 && !isNaN(amount) && (
               <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                     Total Value
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                     ${(amount * coin.current_price).toLocaleString()}
                  </span>
               </div>
            )}

            <button
               type="submit"
               className={`w-full font-bold py-3 rounded-lg transition-colors text-white ${
                  mode === "buy"
                     ? "bg-blue-600 hover:bg-blue-500"
                     : "bg-red-600 hover:bg-red-500"
               }`}
            >
               {mode === "buy" ? "Confirm Purchase" : "Confirm Sale"}
            </button>
         </form>
      </div>
   );
};
