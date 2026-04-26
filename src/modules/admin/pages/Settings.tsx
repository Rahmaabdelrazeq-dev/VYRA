import React, { useState, useEffect } from "react";
import { Shield, Bell, Globe, Save, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

// Component Imports
import BrandSettings from "../components/settings/BrandSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import AlertSettings from "../components/settings/AlertSettings";

const API_URL = "https://690e4923bd0fefc30a040b18.mockapi.io/Perfume";

// Shared interface to ensure consistency with children
export interface SettingsState {
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

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("brand");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState<SettingsState>({
    houseName: "VYRA",
    currency: "USD ($)",
    tone: "Bespoke",
    bio: "A luxury fragrance house dedicated to the art of olfactory storytelling.",
    adminName: "Master Curator",
    adminEmail: "curator@vyra.boutique",
    adminPassword: "••••••••",
    adminRole: "Lead Alchemist",
    twoFactor: true,
  });

  useEffect(() => {
    const syncAdminData = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data) {
          setSettings((prev) => ({
            ...prev,
            houseName: "VYRA",
            adminName: "Master Curator",
          }));
        }
      } catch (error) {
        // FIXED: Using the error variable professionally for debugging
        console.error("Critical: Admin Sync Failure", error);
      } finally {
        setIsLoading(false);
      }
    };
    syncAdminData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("House records synchronized.");
    } catch (error) {
      // FIXED: Using the error variable to log save failures
      console.error("Save Operation Failure:", error);
      toast.error("Failed to sync house settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="animate-spin text-neutral-200" size={32} />
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
          Verifying Credentials...
        </p>
      </div>
    );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-2 font-sans text-black">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-light italic uppercase tracking-tight">
            System & Identity
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">
            Access Level: {settings.adminRole}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-black text-white px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center space-x-3 disabled:opacity-50 shadow-xl shadow-black/10"
        >
          {isSaving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          <span>{isSaving ? "Syncing..." : "Update Boutique"}</span>
        </button>
      </header>

      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-16">
        <aside className="w-full lg:w-56 space-y-2">
          {[
            { id: "brand", label: "Brand Profile", icon: <Globe size={16} /> },
            {
              id: "security",
              label: "Security & Access",
              icon: <Shield size={16} />,
            },
            {
              id: "notifications",
              label: "Operational Alerts",
              icon: <Bell size={16} />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-[11px] uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-black text-white shadow-lg shadow-black/20"
                  : "text-gray-400 hover:text-black hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </aside>

        <div className="flex-1 bg-white border border-gray-100 rounded-[3rem] p-12 shadow-sm min-h-[500px]">
          {activeTab === "brand" && (
            <BrandSettings settings={settings} setSettings={setSettings} />
          )}
          {activeTab === "security" && (
            <SecuritySettings
              settings={settings}
              setSettings={setSettings}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
          {activeTab === "notifications" && <AlertSettings />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
