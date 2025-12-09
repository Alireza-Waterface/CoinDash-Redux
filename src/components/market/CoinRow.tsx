import { memo } from "react";
import type { Coin } from "../../types/coin";

import type { Dispatch, SetStateAction } from "react";

interface CoinRowProps {
   coin: Coin;
   setSelectedCoin: Dispatch<SetStateAction<Coin | null>>;
   onBuy: () => void;
}

const CoinRow = memo(({ coin, onBuy, setSelectedCoin }: CoinRowProps) => {
   const isPositive = coin.price_change_percentage_24h >= 0;

   return (
      <div
         onClick={onBuy}
         className="flex items-center justify-between flex-wrap gap-4 p-2 mb-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:border-blue-500/50 transition-all cursor-pointer group"
      >
         <div className="flex items-center gap-2 md:gap-4">
            <span className="text-slate-400 dark:text-slate-500 w-4 text-sm">
               #{coin.market_cap_rank}
            </span>
            <img
               src={coin.image}
               alt={coin.name}
               className="w-8 h-8 rounded-full"
            />
            <div>
               <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                  {coin.name}
               </h3>
               <span className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                  {coin.symbol}
               </span>
            </div>
         </div>

         <div className="flex items-center gap-2 md:gap-6">
            <div className="text-right">
               <p className="font-mono text-slate-800 dark:text-slate-100 font-medium">
                  ${coin.current_price.toLocaleString()}
               </p>
               <p
                  className={`text-xs md:text-sm font-medium ${
                     isPositive
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                  }`}
               >
                  {isPositive ? "+" : ""}
                  {coin.price_change_percentage_24h.toFixed(2)}%
               </p>
            </div>

            <button
               onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCoin(coin);
               }}
               className="bg-blue-600 text-white px-3 py-1 rounded text-md cursor-pointer active:translate-y-1 transition-transform"
            >
               Trade
            </button>
         </div>
      </div>
   );
});

export default CoinRow;
