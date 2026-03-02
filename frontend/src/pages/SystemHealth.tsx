import { Activity, CheckCircle, AlertTriangle } from "lucide-react";

interface HealthMetric {
  label: string;
  value: string;
  status: "good" | "warning" | "critical";
  icon: string;
}

const healthMetrics: HealthMetric[] = [
  { label: "Active Sensors", value: "24/24", status: "good", icon: "sensors" },
  { label: "Data Accuracy", value: "99.8%", status: "good", icon: "accuracy" },
  { label: "System Uptime", value: "99.9%", status: "good", icon: "uptime" },
  { label: "Network Status", value: "Stable", status: "good", icon: "network" },
];

export function SystemHealth() {
  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/30 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">System Health</h2>
        <div className="flex items-center gap-2 text-[#2ECC71]">
          <CheckCircle size={20} />
          <span className="text-sm font-medium">Optimal</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {healthMetrics.map((metric, index) => (
          <div
            key={index}
            className="backdrop-blur-sm bg-[#F4FBFC]/50 border border-[#BFE9F0]/50 rounded-lg p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{metric.label}</span>
              {metric.status === "good" && (
                <CheckCircle size={16} className="text-[#2ECC71]" />
              )}
              {metric.status === "warning" && (
                <AlertTriangle size={16} className="text-[#F39C12]" />
              )}
              {metric.status === "critical" && (
                <AlertTriangle size={16} className="text-[#E74C3C]" />
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="mt-6 space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Overall Performance</span>
            <span className="font-medium text-gray-900">98%</span>
          </div>
          <div className="w-full bg-gray-200/50 backdrop-blur-sm rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#2ECC71] to-[#2ECC71]/80 h-2.5 rounded-full shadow-sm"
              style={{ width: "98%" }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Data Transmission</span>
            <span className="font-medium text-gray-900">95%</span>
          </div>
          <div className="w-full bg-gray-200/50 backdrop-blur-sm rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] h-2.5 rounded-full shadow-sm"
              style={{ width: "95%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}