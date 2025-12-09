import { useAppSelector } from "../../app/hooks";
import type { Coin } from "../../types/coin";
import { Modal } from "../../components/ui/Modal";
import { TradeForm } from "./TradeForm";
import { useState } from "react";

interface PortfolioViewProps {
   coins: Coin[]; // Live prices passed from parent
}

export const PortfolioView = ({ coins }: PortfolioViewProps) => {
   const assets = useAppSelector((state) => state.portfolio.assets);
   const [sellingCoin, setSellingCoin] = useState<Coin | null>(null);

   // 1. Derive Data: Merge User Asset with Market Price
   const enrichedAssets = assets.map((asset) => {
      const marketData = coins.find((c) => c.id === asset.id);
      return {
         ...asset,
         name: marketData?.name || asset.id,
         image: marketData?.image || "",
         currentPrice: marketData?.current_price || 0,
         totalValue: (marketData?.current_price || 0) * asset.quantity,
         priceChange: marketData?.price_change_percentage_24h || 0,
         originalCoin: marketData,
      };
   });

   // 2. Calculate Total Portfolio Balance
   const totalBalance = enrichedAssets.reduce(
      (sum, asset) => sum + asset.totalValue,
      0
   );

   if (assets.length === 0) {
      return (
         <div className="text-center py-20 bg-slate-200 rounded-xl border border-slate-700 border-dashed dark:bg-slate-700">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
               Your portfolio is empty
            </h3>
            <p className="text-slate-800/80 mt-2 dark:text-slate-100/70">
               Go to the Market view to start trading.
            </p>
         </div>
      );
   }

   return (
      <>
         <div className="space-y-6">
            <div className="bg-linear-to-r from-blue-500 to-indigo-500 p-8 rounded-2xl shadow-xl text-white">
               <h2 className="text-4xl font-bold tracking-tight">
                  $
                  {totalBalance.toLocaleString(undefined, {
                     minimumFractionDigits: 2,
                     maximumFractionDigits: 2,
                  })}
               </h2>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase font-medium">
                     <tr>
                        <th className="p-4">Asset</th>
                        <th className="p-4 text-right">Balance</th>
                        <th className="p-4 text-right hidden md:table-cell">
                           Value
                        </th>
                        <th className="p-4 text-center">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                     {enrichedAssets.map((asset) => (
                        <tr
                           key={asset.id}
                           className="hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 {asset.image && (
                                    <img
                                       src={asset.image}
                                       alt={asset.name}
                                       className="w-8 h-8 rounded-full"
                                    />
                                 )}
                                 <div>
                                    <p className="font-bold text-slate-800 dark:text-slate-100">
                                       {asset.name}
                                    </p>
                                    <p
                                       className={`text-xs ${
                                          asset.priceChange >= 0
                                             ? "text-green-500"
                                             : "text-red-500"
                                       }`}
                                    >
                                       {asset.priceChange.toFixed(2)}%
                                    </p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-4 text-right text-slate-700 dark:text-slate-300">
                              <p className="font-medium">{asset.quantity}</p>
                           </td>
                           <td className="p-4 text-right hidden md:table-cell">
                              <p className="font-bold text-slate-900 dark:text-white">
                                 $
                                 {asset.totalValue.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                 })}
                              </p>
                           </td>
                           <td className="p-4 text-center">
                              <button
                                 onClick={() =>
                                    asset.originalCoin &&
                                    setSellingCoin(asset.originalCoin)
                                 }
                                 className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium hover:cursor-pointer"
                              >
                                 Manage
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <Modal
            isOpen={!!sellingCoin}
            onClose={() => setSellingCoin(null)}
            title="Manage Asset"
         >
            {sellingCoin && (
               <TradeForm
                  coin={sellingCoin}
                  initialMode="sell"
                  onSuccess={() => setSellingCoin(null)}
               />
            )}
         </Modal>
      </>
   );
};
