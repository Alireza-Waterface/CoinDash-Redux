import { Outlet, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTheme, toggleTheme } from "../../features/ui/uiSlice";
import { ToastContainer } from "../ui/ToastContainer";
import { Suspense } from "react";
import { Loader } from "../ui/Loader";

export const AppLayout = () => {
   const dispatch = useAppDispatch();
   const theme = useAppSelector(selectTheme);
   const portfolioAssets = useAppSelector((state) => state.portfolio.assets);

   return (
      <div className={theme}>
         <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
            <div className="p-4 md:p-12">
               <header className="max-w-4xl mx-auto mb-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                     <div className="flex justify-between items-center">
                        <NavLink
                           to="/"
                           className="hover:opacity-80 transition-opacity"
                        >
                           <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400">
                              CoinDash
                           </h1>
                           <p className="text-slate-500 dark:text-slate-400 text-sm">
                              Crypto Portfolio Tracker
                           </p>
                        </NavLink>
                        <button
                           onClick={() => dispatch(toggleTheme())}
                           className="md:hidden text-2xl"
                        >
                           {theme === "dark" ? "☀️" : "🌙"}
                        </button>
                     </div>

                     <div className="flex items-center gap-4">
                        <nav className="bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-700 rounded-xl inline-flex shadow-sm">
                           <NavLink
                              to="/"
                              className={({ isActive }) =>
                                 `px-4 md:px-6 py-2 rounded-lg font-medium text-sm md:text-base transition-all ${
                                    isActive
                                       ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                       : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                                 }`
                              }
                           >
                              Market
                           </NavLink>
                           <NavLink
                              to="/portfolio"
                              className={({ isActive }) =>
                                 `px-4 md:px-6 py-2 rounded-lg font-medium text-sm md:text-base transition-all ${
                                    isActive
                                       ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                       : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                                 }`
                              }
                           >
                              Portfolio ({portfolioAssets.length})
                           </NavLink>
                        </nav>

                        <button
                           onClick={() => dispatch(toggleTheme())}
                           className="hidden md:block p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer outline-none"
                        >
                           {theme === "dark" ? "☀️" : "🌙"}
                        </button>
                     </div>
                  </div>
               </header>

               <main className="max-w-4xl mx-auto min-h-[500px]">
                  <Suspense fallback={<Loader />}>
                     <Outlet />
                  </Suspense>
               </main>

               <ToastContainer />
            </div>
         </div>
      </div>
   );
};
