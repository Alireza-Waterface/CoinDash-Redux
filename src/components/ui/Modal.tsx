import { type ReactNode, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
   const modalRef = useRef<HTMLElement>(null);

   useClickOutside(modalRef, onClose);

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
         <div
            ref={modalRef as React.RefObject<HTMLDivElement>}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all scale-100"
         >
            <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
               <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {title}
               </h2>
               <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-red-500 transition-colors text-2xl leading-none"
               >
                  &times;
               </button>
            </div>
            <div className="p-4">{children}</div>
         </div>
      </div>
   );
};
