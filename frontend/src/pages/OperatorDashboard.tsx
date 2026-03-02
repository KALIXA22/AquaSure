import { CheckCircle, AlertCircle, XCircle, Gauge, Power, History } from "lucide-react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function OperatorDashboard() {
  const [valveStatus, setValveStatus] = useState<"open" | "closed">("open");
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Generate station-specific data
    const data = Array.from({ length: 12 }, (_, i) => ({
      time: `${i * 2}:00`,
      value: 7.2 + Math.random() * 0.6 - 0.3,
    }));
    setChartData(data);
  }, []);

  const complianceStatus = "warning"; // "safe" | "warning" | "violation"

  const sensorData = [
    { name: "pH", value: 7.8, unit: "pH", status: "warning", min: 6.5, max: 8.5, current: 7.8 },
    { name: "Turbidity", value: 4.2, unit: "NTU", status: "safe", min: 0, max: 5, current: 4.2 },
    { name: "Temperature", value: 24.5, unit: "°C", status: "safe", min: 20, max: 30, current: 24.5 },
    { name: "Electrical Conductivity", value: 485, unit: "μS/cm", status: "safe", min: 200, max: 800, current: 485 },
  ];

  const alertHistory = [
    { id: 1, message: "pH approaching upper threshold", time: "30 min ago", severity: "warning" },
    { id: 2, message: "Turbidity spike detected", time: "2 hours ago", severity: "warning" },
    { id: 3, message: "Normal operation resumed", time: "4 hours ago", severity: "info" },
    { id: 4, message: "Temperature within safe range", time: "6 hours ago", severity: "info" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2A2F]">Industry Operator Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Station B - Manufacturing Plant Outlet</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-xl px-4 py-2 shadow-lg">
            <span className="text-xs text-gray-600">Station ID:</span>
            <span className="ml-2 font-semibold text-[#0A2A2F]">STN-B-001</span>
          </div>
        </div>
      </div>

      {/* Compliance Status & Valve Control */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compliance Status Panel */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-semibold text-[#0A2A2F] mb-4 flex items-center gap-2">
            <Gauge size={20} className="text-[#1F7A8C]" />
            Compliance Status
          </h2>
          <div className="flex flex-col items-center justify-center py-8">
            {complianceStatus === "safe" && (
              <>
                <CheckCircle size={64} className="text-[#2ECC71] mb-4" />
                <p className="text-2xl font-bold text-[#2ECC71]">SAFE</p>
                <p className="text-sm text-gray-600 mt-2">All parameters within compliance</p>
              </>
            )}
            {complianceStatus === "warning" && (
              <>
                <AlertCircle size={64} className="text-[#F39C12] mb-4" />
                <p className="text-2xl font-bold text-[#F39C12]">WARNING</p>
                <p className="text-sm text-gray-600 mt-2">pH approaching threshold limits</p>
              </>
            )}
            {complianceStatus === "violation" && (
              <>
                <XCircle size={64} className="text-[#E74C3C] mb-4 animate-pulse" />
                <p className="text-2xl font-bold text-[#E74C3C]">VIOLATION</p>
                <p className="text-sm text-gray-600 mt-2">Immediate action required</p>
              </>
            )}
          </div>
        </div>

        {/* Valve Status Indicator */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-semibold text-[#0A2A2F] mb-4 flex items-center gap-2">
            <Power size={20} className="text-[#1F7A8C]" />
            Discharge Valve Control
          </h2>
          <div className="flex flex-col items-center justify-center py-8">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                valveStatus === "open"
                  ? "bg-gradient-to-br from-[#2ECC71] to-[#27AE60] shadow-lg shadow-green-500/50"
                  : "bg-gradient-to-br from-gray-400 to-gray-500 shadow-lg"
              }`}
            >
              <Power size={48} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-[#0A2A2F] mb-2">
              {valveStatus === "open" ? "OPEN" : "CLOSED"}
            </p>
            <button
              onClick={() => setValveStatus(valveStatus === "open" ? "closed" : "open")}
              className={`mt-4 px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ${
                valveStatus === "open"
                  ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
                  : "bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white"
              }`}
            >
              {valveStatus === "open" ? "Close Valve" : "Open Valve"}
            </button>
          </div>
        </div>
      </div>

      {/* Sensor Cards */}
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-semibold text-[#0A2A2F] mb-4">Sensor Readings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensorData.map((sensor) => (
            <div
              key={sensor.name}
              className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-xl p-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">{sensor.name}</h3>
                <div
                  className={`w-3 h-3 rounded-full ${
                    sensor.status === "safe"
                      ? "bg-[#2ECC71]"
                      : sensor.status === "warning"
                      ? "bg-[#F39C12]"
                      : "bg-[#E74C3C]"
                  }`}
                />
              </div>
              <p className="text-3xl font-bold text-[#0A2A2F] mb-1">
                {sensor.value}
                <span className="text-lg text-gray-500 ml-1">{sensor.unit}</span>
              </p>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      sensor.status === "safe"
                        ? "bg-[#2ECC71]"
                        : sensor.status === "warning"
                        ? "bg-[#F39C12]"
                        : "bg-[#E74C3C]"
                    }`}
                    style={{
                      width: `${((sensor.current - sensor.min) / (sensor.max - sensor.min)) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{sensor.min}</span>
                  <span>{sensor.max}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Station Graph & Alert History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Station-Specific Graph */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-semibold text-[#0A2A2F] mb-4">pH Trend - Last 24 Hours</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BFE9F0" />
              <XAxis dataKey="time" stroke="#0A2A2F" style={{ fontSize: 12 }} />
              <YAxis stroke="#0A2A2F" style={{ fontSize: 12 }} domain={[6, 9]} />
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.9)",
                  border: "1px solid #BFE9F0",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1F7A8C"
                strokeWidth={3}
                dot={{ fill: "#1F7A8C", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alert History */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-semibold text-[#0A2A2F] mb-4 flex items-center gap-2">
            <History size={20} className="text-[#1F7A8C]" />
            Alert History
          </h2>
          <div className="space-y-3">
            {alertHistory.map((alert) => (
              <div
                key={alert.id}
                className={`backdrop-blur-sm bg-white/60 border-l-4 rounded-lg p-4 ${
                  alert.severity === "warning"
                    ? "border-[#F39C12]"
                    : alert.severity === "critical"
                    ? "border-[#E74C3C]"
                    : "border-[#2ECC71]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-[#0A2A2F] flex-1">{alert.message}</p>
                  <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
