import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
   removeToast,
   selectToasts,
   type Toast,
} from "../../features/ui/uiSlice";

const ToastItem = ({ toast }: { toast: Toast }) => {
   const dispatch = useAppDispatch();

   // Auto-dismiss after 3 seconds
   useEffect(() => {
      const timer = setTimeout(() => {
         dispatch(removeToast(toast.id));
      }, 3000);

      return () => clearTimeout(timer);
   }, [dispatch, toast.id]);

   // Dynamic styles based on type
   const bgColors = {
      success: "bg-green-600 border-green-500",
      error: "bg-red-600 border-red-500",
      info: "bg-blue-600 border-blue-500",
   };

   return (
      <div
         className={`mb-3 p-4 rounded-lg shadow-lg border text-white flex items-center justify-between min-w-[300px] animate-in slide-in-from-right duration-300 ${
            bgColors[toast.type]
         }`}
      >
         <p className="font-medium text-sm">{toast.message}</p>
         <button
            onClick={() => dispatch(removeToast(toast.id))}
            className="ml-4 opacity-70 hover:opacity-100"
         >
            &times;
         </button>
      </div>
   );
};

export const ToastContainer = () => {
   const toasts = useAppSelector(selectToasts);

   return (
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
         {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
         ))}
      </div>
   );
};
