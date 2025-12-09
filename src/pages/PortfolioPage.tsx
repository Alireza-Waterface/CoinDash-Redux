import { PortfolioView } from "../features/portfolio/PortfolioView";
import { useGetTopCoinsQuery } from "../features/market/marketApi";
import { Loader } from "../components/ui/Loader";

export default function PortfolioPage() {
   const { data: coins, isLoading } = useGetTopCoinsQuery(50);

   if (isLoading) return <Loader />;

   return <PortfolioView coins={coins || []} />;
}
