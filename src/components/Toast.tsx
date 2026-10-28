import React from "react";
import { useApp } from "../context/AppContext";
import Icon from "./Icons";

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-gray-900 text-white rounded-2xl p-4 shadow-2xl border border-gray-800 flex items-start gap-3 animate-scale-up">
      <div
        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
          toast.type === "info"
            ? "bg-blue-900/60 text-blue-300"
            : toast.type === "warning"
            ? "bg-amber-900/60 text-amber-300"
            : "bg-emerald-900/60 text-emerald-300"
        }`}
      >
        <Icon
          name={
            toast.type === "info"
              ? "spark"
              : toast.type === "warning"
              ? "alert"
              : "check"
          }
          size={16}
        />
      </div>

      <div className="min-w-0 flex-1">
        <strong className="text-xs font-bold block text-gray-100">
          {toast.message}
        </strong>
        {toast.submessage && (
          <span className="text-[11px] text-gray-400 block truncate mt-0.5">
            {toast.submessage}
          </span>
        )}
      </div>
    </div>
  );
};

export default Toast;
