import React from "react";
import { AlertTriangle } from "lucide-react";

const AlertSettings: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-6">
        Active House Intelligence
      </h3>
      <div className="flex items-start space-x-6 p-8 bg-rose-50/20 border border-rose-100/50 rounded-[2rem]">
        <AlertTriangle className="text-rose-500 shrink-0" size={20} />
        <div className="flex-1">
          <p className="text-xs font-bold text-rose-900 uppercase tracking-widest">
            Inventory Threshold Breach
          </p>
          <p className="text-[11px] text-rose-700/70 mt-2 leading-relaxed italic">
            Limited availability detected in signature scents. Replenishment
            required.
          </p>
        </div>
      </div>
      <div className="p-8 border border-dashed border-gray-100 rounded-3xl text-center">
        <p className="text-[10px] text-gray-300 uppercase tracking-widest italic">
          All other system heartbeats are normal.
        </p>
      </div>
    </div>
  );
};

export default AlertSettings;
