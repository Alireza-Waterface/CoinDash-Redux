import { useState, useMemo } from "react";
import { useGetTopCoinsQuery } from "../features/market/marketApi";
import CoinRow from "../components/market/CoinRow";
import { Loader } from "../components/ui/Loader";
import { Modal } from "../components/ui/Modal";
import { TradeForm } from "../features/portfolio/TradeForm";
import type { Coin } from "../types/coin";
import { useNavigate } from "react-router-dom";

export default function MarketPage() {
   const { data: coins, error, isLoading } = useGetTopCoinsQuery(50);
   const [search, setSearch] = useState("");
   const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
   const [sortBy, setSortBy] = useState<"rank" | "price" | "change">("rank");
   const navigate = useNavigate();

   const filteredCoins = useMemo(() => {
      if (!coins) return [];
      let result = [...coins];

      if (search) {
         const lowerSearch = search.toLowerCase();
         result = result.filter(
            (c) =>
               c.name.toLowerCase().includes(lowerSearch) ||
               c.symbol.toLowerCase().includes(lowerSearch)
         );
      }

      result.sort((a, b) => {
         if (sortBy === "price") return b.current_price - a.current_price;
         if (sortBy === "change")
            return (
               b.price_change_percentage_24h - a.price_change_percentage_24h
            );
         return a.market_cap_rank - b.market_cap_rank;
      });

      return result;
   }, [coins, search, sortBy]);

   if (isLoading) return <Loader />;
   if (error) return <div>Error loading market data</div>;

   return (
      <>
         <div className="mb-4 flex flex-wrap items-center gap-4 justify-between">
            <input
               type="text"
               placeholder="Search..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="bg-white dark:bg-slate-800 border border-blue-500 outline outline-blue-500 rounded-lg px-4 py-2 min-w-64 text-slate-800 dark:text-slate-100"
            />

            <select
               name="filter"
               id="filter"
               className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700"
               value={sortBy}
               onChange={(e) =>
                  setSortBy(e.target.value as "rank" | "price" | "change")
               }
            >
               <option value="rank">rank</option>
               <option value="price">price</option>
               <option value="change">change</option>
            </select>
         </div>

         <div className="grid gap-2">
            {filteredCoins?.map((coin) => (
               <div key={coin.id} className="relative group">
                  <CoinRow
                     coin={coin}
                     setSelectedCoin={setSelectedCoin}
                     onBuy={() => navigate(`/coin/${coin.id}`)}
                  />
               </div>
            ))}
         </div>

         <Modal
            isOpen={!!selectedCoin}
            onClose={() => setSelectedCoin(null)}
            title="Trade"
         >
            {selectedCoin && (
               <TradeForm
                  coin={selectedCoin}
                  onSuccess={() => setSelectedCoin(null)}
               />
            )}
         </Modal>
      </>
   );
}
