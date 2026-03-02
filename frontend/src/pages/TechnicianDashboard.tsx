import { Wrench, Activity, Power, RotateCcw, Settings, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState } from "react";

export function TechnicianDashboard() {
  const [sensors, setSensors] = useState([
    { id: 1, name: "pH Sensor", status: "operational", battery: 85, lastCalibration: "2 days ago", nextCalibration: "28 days" },
    { id: 2, name: "Turbidity Sensor", status: "warning", battery: 45, lastCalibration: "15 days ago", nextCalibration: "15 days" },
    { id: 3, name: "Temperature Sensor", status: "operational", battery: 92, lastCalibration: "5 days ago", nextCalibration: "25 days" },
    { id: 4, name: "Conductivity Sensor", status: "operational", battery: 78, lastCalibration: "1 day ago", nextCalibration: "29 days" },
  ]);

  const [valveOverride, setValveOverride] = useState(false);

  const maintenanceLogs = [
    { id: 1, action: "Calibrated pH sensor", technician: "John Smith", time: "2 days ago", status: "completed" },
    { id: 2, action: "Replaced turbidity sensor filter", technician: "Sarah Johnson", time: "1 week ago", status: "completed" },
    { id: 3, action: "System diagnostics performed", technician: "Mike Chen", time: "2 weeks ago", status: "completed" },
    { id: 4, action: "Valve maintenance scheduled", technician: "John Smith", time: "Pending", status: "scheduled" },
  ];

  const handleCalibrate = (sensorId: number) => {
    setSensors(sensors.map(sensor => 
      sensor.id === sensorId 
        ? { ...sensor, lastCalibration: "Just now", nextCalibration: "30 days", status: "operational" }
        : sensor
    ));
  };

  const handleSystemReset = () => {
    if (confirm("Are you sure you want to reset the system? This will restart all sensors.")) {
      alert("System reset initiated. All sensors will restart in 5 seconds.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2A2F]">Technician Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Industrial Maintenance Control System</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-xl px-4 py-2 shadow-lg">
            <span className="text-xs text-gray-600">System Status:</span>
            <span className="ml-2 font-semibold text-[#2ECC71]">Online</span>
          </div>
        </div>
      </div>

      {/* System Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manual Valve Override */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Power size={20} className="text-[#1F7A8C]" />
            <h2 className="text-lg font-semibold text-[#0A2A2F]">Valve Override</h2>
          </div>
          <div className="flex flex-col items-center py-4">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all ${
                valveOverride
                  ? "bg-gradient-to-br from-[#F39C12] to-[#E67E22] shadow-lg shadow-orange-500/50"
                  : "bg-gradient-to-br from-gray-300 to-gray-400"
              }`}
            >
              <Power size={36} className="text-white" />
            </div>
            <p className="text-sm font-medium text-[#0A2A2F] mb-3">
              {valveOverride ? "Manual Control Active" : "Auto Mode"}
            </p>
            <button
              onClick={() => setValveOverride(!valveOverride)}
              className={`px-5 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ${
                valveOverride
                  ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
                  : "bg-gradient-to-r from-[#F39C12] to-[#E67E22] text-white"
              }`}
            >
              {valveOverride ? "Disable Override" : "Enable Override"}
            </button>
          </div>
        </div>

        {/* System Reset */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw size={20} className="text-[#E74C3C]" />
            <h2 className="text-lg font-semibold text-[#0A2A2F]">System Reset</h2>
          </div>
          <div className="flex flex-col items-center py-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-[#E74C3C] to-[#C0392B] shadow-lg">
              <RotateCcw size={36} className="text-white" />
            </div>
            <p className="text-sm text-gray-600 mb-3 text-center">
              Restart all sensors and controllers
            </p>
            <button
              onClick={handleSystemReset}
              className="px-5 py-2 bg-gradient-to-r from-[#E74C3C] to-[#C0392B] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              Reset System
            </button>
          </div>
        </div>

        {/* Device Status Summary */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-[#2ECC71]" />
            <h2 className="text-lg font-semibold text-[#0A2A2F]">Device Summary</h2>
          </div>
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Operational Sensors</span>
              <span className="text-lg font-bold text-[#2ECC71]">3/4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Warnings</span>
              <span className="text-lg font-bold text-[#F39C12]">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Battery</span>
              <span className="text-lg font-bold text-[#1F7A8C]">75%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Next Calibration</span>
              <span className="text-lg font-bold text-[#0A2A2F]">15 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Health Status Cards */}
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Wrench size={20} className="text-[#1F7A8C]" />
          <h2 className="text-lg font-semibold text-[#0A2A2F]">Sensor Health & Calibration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sensors.map((sensor) => (
            <div
              key={sensor.id}
              className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-xl p-5 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0A2A2F] mb-1">{sensor.name}</h3>
                  <div className="flex items-center gap-2">
                    {sensor.status === "operational" ? (
                      <CheckCircle2 size={16} className="text-[#2ECC71]" />
                    ) : (
                      <AlertTriangle size={16} className="text-[#F39C12]" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        sensor.status === "operational" ? "text-[#2ECC71]" : "text-[#F39C12]"
                      }`}
                    >
                      {sensor.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleCalibrate(sensor.id)}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] text-white text-xs font-semibold rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  Calibrate
                </button>
              </div>

              <div className="space-y-3">
                {/* Battery Status */}
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Battery Level</span>
                    <span className="font-semibold">{sensor.battery}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        sensor.battery > 70
                          ? "bg-[#2ECC71]"
                          : sensor.battery > 40
                          ? "bg-[#F39C12]"
                          : "bg-[#E74C3C]"
                      }`}
                      style={{ width: `${sensor.battery}%` }}
                    />
                  </div>
                </div>

                {/* Calibration Info */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Last Calibration</p>
                    <p className="text-sm font-semibold text-[#0A2A2F] mt-1">{sensor.lastCalibration}</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Next Due</p>
                    <p className="text-sm font-semibold text-[#0A2A2F] mt-1">{sensor.nextCalibration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Logs */}
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText size={20} className="text-[#1F7A8C]" />
          <h2 className="text-lg font-semibold text-[#0A2A2F]">Maintenance Logs</h2>
        </div>
        <div className="space-y-3">
          {maintenanceLogs.map((log) => (
            <div
              key={log.id}
              className="backdrop-blur-sm bg-white/60 border border-white/30 rounded-xl p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-[#0A2A2F] mb-1">{log.action}</p>
                  <p className="text-sm text-gray-600">Technician: {log.technician}</p>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-block px-3 py-1 rounded-lg text-xs font-medium mb-2 ${
                      log.status === "completed"
                        ? "bg-green-100 text-[#2ECC71]"
                        : "bg-blue-100 text-[#1F7A8C]"
                    }`}
                  >
                    {log.status.toUpperCase()}
                  </div>
                  <p className="text-xs text-gray-500">{log.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
