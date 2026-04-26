import React from "react";

// Professional interface to replace 'any'
interface SettingsState {
  houseName: string;
  currency: string;
  tone: string;
  bio: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  adminRole: string;
  twoFactor: boolean;
}

interface BrandProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
}

const BrandSettings: React.FC<BrandProps> = ({ settings, setSettings }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* House Name Input */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
            House Name
          </label>
          <input
            type="text"
            value={settings.houseName}
            onChange={(e) =>
              setSettings({ ...settings, houseName: e.target.value })
            }
            className="w-full border-b border-gray-100 py-3 outline-none focus:border-black bg-transparent text-base font-light transition-colors"
          />
        </div>

        {/* Currency Selector */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
            Boutique Currency
          </label>
          <select
            value={settings.currency}
            onChange={(e) =>
              setSettings({ ...settings, currency: e.target.value })
            }
            className="w-full border-b border-gray-100 py-3 outline-none focus:border-black bg-transparent text-sm font-light cursor-pointer"
          >
            <option value="USD ($)">USD ($)</option>
            <option value="EUR (€)">EUR (€)</option>
            <option value="GBP (£)">GBP (£)</option>
          </select>
        </div>
      </div>

      {/* Biography Textarea */}
      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
          House Biography
        </label>
        <textarea
          rows={3}
          value={settings.bio}
          onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
          className="w-full border border-gray-100 rounded-[1.5rem] p-6 outline-none focus:border-black bg-neutral-50/30 text-sm font-light leading-relaxed transition-all"
        />
      </div>
    </div>
  );
};

export default BrandSettings;
