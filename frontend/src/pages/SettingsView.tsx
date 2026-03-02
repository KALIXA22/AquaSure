import { Bell, Shield, Database, Wifi, Save } from "lucide-react";
import { useState } from "react";

export function SettingsView() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      critical: true,
      warning: true,
      info: false,
    },
    thresholds: {
      ph: { min: 6.5, max: 8.5 },
      turbidity: { max: 2.5 },
      temperature: { min: 20, max: 25 },
      conductivity: { min: 400, max: 500 },
    },
    monitoring: {
      updateInterval: 5,
      dataRetention: 90,
      autoBackup: true,
    }
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Simulate saving settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure system preferences and thresholds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#1F7A8C]/10 rounded-lg flex items-center justify-center">
              <Bell size={20} className="text-[#1F7A8C]" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: e.target.checked }
                })}
                className="w-5 h-5 rounded accent-[#1F7A8C]"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Push Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: e.target.checked }
                })}
                className="w-5 h-5 rounded accent-[#1F7A8C]"
              />
            </div>
            <div className="h-px bg-gray-200 my-4"></div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Critical Alerts</label>
              <input
                type="checkbox"
                checked={settings.notifications.critical}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, critical: e.target.checked }
                })}
                className="w-5 h-5 rounded accent-[#E74C3C]"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Warning Alerts</label>
              <input
                type="checkbox"
                checked={settings.notifications.warning}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, warning: e.target.checked }
                })}
                className="w-5 h-5 rounded accent-[#F39C12]"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Info Alerts</label>
              <input
                type="checkbox"
                checked={settings.notifications.info}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, info: e.target.checked }
                })}
                className="w-5 h-5 rounded accent-[#1F7A8C]"
              />
            </div>
          </div>
        </div>

        {/* Monitoring Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#1F7A8C]/10 rounded-lg flex items-center justify-center">
              <Wifi size={20} className="text-[#1F7A8C]" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Monitoring</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Update Interval (seconds)</label>
              <input
                type="number"
                placeholder="Enter update interval in seconds"
                value={settings.monitoring.updateInterval}
                onChange={(e) => setSettings({
                  ...settings,
                  monitoring: { ...settings.monitoring, updateInterval: parseInt(e.target.value) }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F7A8C]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Data Retention (days)</label>
              <input
                type="number"
                placeholder="Enter retention days"
                value={settings.monitoring.dataRetention}
                onChange={(e) => setSettings({
                  ...settings,
                  monitoring: { ...settings.monitoring, dataRetention: parseInt(e.target.value) }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F7A8C]"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Automatic Backup</label>
              <input
                type="checkbox"
                checked={settings.monitoring.autoBackup}
                onChange={(e) => setSettings({
                  ...settings,
                  monitoring: { ...settings.monitoring, autoBackup: e.target.checked }
                })}
                className="w-5 h-5 rounded accent-[#1F7A8C]"
              />
            </div>
          </div>
        </div>

        {/* pH Thresholds */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">pH Level Thresholds</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Minimum pH</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g., 6.5"
                value={settings.thresholds.ph.min}
                onChange={(e) => setSettings({
                  ...settings,
                  thresholds: { ...settings.thresholds, ph: { ...settings.thresholds.ph, min: parseFloat(e.target.value) }}
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F7A8C]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Maximum pH</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g., 8.5"
                value={settings.thresholds.ph.max}
                onChange={(e) => setSettings({
                  ...settings,
                  thresholds: { ...settings.thresholds, ph: { ...settings.thresholds.ph, max: parseFloat(e.target.value) }}
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F7A8C]"
              />
            </div>
          </div>
        </div>

        {/* Temperature Thresholds */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-4">Temperature Thresholds (°C)</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Minimum Temperature</label>
              <input
                type="number"
                placeholder="e.g., 20"
                value={settings.thresholds.temperature.min}
                onChange={(e) => setSettings({
                  ...settings,
                  thresholds: { ...settings.thresholds, temperature: { ...settings.thresholds.temperature, min: parseInt(e.target.value) }}
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F7A8C]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Maximum Temperature</label>
              <input
                type="number"
                placeholder="e.g., 26"
                value={settings.thresholds.temperature.max}
                onChange={(e) => setSettings({
                  ...settings,
                  thresholds: { ...settings.thresholds, temperature: { ...settings.thresholds.temperature, max: parseInt(e.target.value) }}
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1F7A8C]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-[#1F7A8C] text-white rounded-lg font-medium hover:bg-[#1F7A8C]/90 transition-colors"
        >
          <Save size={20} />
          {saved ? "Settings Saved!" : "Save Settings"}
        </button>
      </div>

      {saved && (
        <div className="mt-4 p-4 bg-[#2ECC71]/10 border border-[#2ECC71] rounded-lg text-[#2ECC71] text-center">
          Settings have been saved successfully!
        </div>
      )}
    </div>
  );
}
