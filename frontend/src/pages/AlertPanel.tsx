import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { useState } from "react";

interface Alert {
  id: number;
  type: "critical" | "warning" | "info";
  message: string;
  time: string;
  location: string;
}

const initialAlerts: Alert[] = [
  {
    id: 1,
    type: "critical",
    message: "Turbidity levels exceeding threshold",
    time: "2 min ago",
    location: "Sensor B-12",
  },
  {
    id: 2,
    type: "warning",
    message: "pH fluctuation detected",
    time: "15 min ago",
    location: "Sensor A-04",
  },
  {
    id: 3,
    type: "info",
    message: "Scheduled maintenance due in 2 days",
    time: "1 hour ago",
    location: "System",
  },
];
export function AlertPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertConfig = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return {
          icon: AlertTriangle,
          bgColor: "bg-[#E74C3C]/10",
          textColor: "text-[#E74C3C]",
          borderColor: "border-l-[#E74C3C]",
        };
      case "warning":
        return {
          icon: AlertCircle,
          bgColor: "bg-[#F39C12]/10",
          textColor: "text-[#F39C12]",
          borderColor: "border-l-[#F39C12]",
        };
      case "info":
        return {
          icon: Info,
          bgColor: "bg-[#1F7A8C]/10",
          textColor: "text-[#1F7A8C]",
          borderColor: "border-l-[#1F7A8C]",
        };
    }
  };

  const filteredAlerts = filter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/30 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Alerts</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
              filter === "all" ? "bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] text-white shadow-md" : "backdrop-blur-sm bg-white/50 border border-white/30 text-gray-700 hover:bg-white/70"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("critical")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
              filter === "critical" ? "bg-[#E74C3C] text-white shadow-md" : "backdrop-blur-sm bg-white/50 border border-white/30 text-gray-700 hover:bg-white/70"
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilter("warning")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
              filter === "warning" ? "bg-[#F39C12] text-white shadow-md" : "backdrop-blur-sm bg-white/50 border border-white/30 text-gray-700 hover:bg-white/70"
            }`}
          >
            Warning
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Info size={32} className="mx-auto mb-2 opacity-50" />
            <p>No {filter !== "all" ? filter : ""} alerts</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;
            
            return (
              <div
                key={alert.id}
                className={`backdrop-blur-sm ${config.bgColor} border-l-4 ${config.borderColor} border border-white/20 p-4 rounded-r-lg relative group hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start gap-3">
                  <Icon size={20} className={config.textColor} />
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium text-sm">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-600">{alert.location}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                    title="Dismiss alert"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}