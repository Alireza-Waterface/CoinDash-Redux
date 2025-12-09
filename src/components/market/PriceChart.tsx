import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
} from "recharts";
import { useGetMarketChartQuery } from "../../features/market/marketApi";
import { Loader } from "../ui/Loader";

interface PriceChartProps {
   coinId: string;
}

export const PriceChart = ({ coinId }: PriceChartProps) => {
   const { data, isLoading, isError } = useGetMarketChartQuery(coinId);

   if (isLoading) return <Loader />;
   if (isError || !data)
      return <div className="text-red-400">Chart unavailable</div>;

   // Format data for Recharts
   const chartData = data.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      price: price,
   }));

   return (
      <div className="h-[300px] w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
               <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
               </defs>
               <XAxis dataKey="date" />
               <YAxis domain={["auto", "auto"]} />
               <Tooltip
                  contentStyle={{
                     backgroundColor: "#1e293b",
                     border: "none",
                     borderRadius: "8px",
                     color: "#fff",
                  }}
                  itemStyle={{ color: "#60a5fa" }}
                  formatter={(value: number) => [
                     `$${value.toLocaleString()}`,
                     "Price",
                  ]}
                  // labelStyle={{ display: "none" }}
               />
               <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  strokeWidth={2}
               />
            </AreaChart>
         </ResponsiveContainer>
      </div>
   );
};
