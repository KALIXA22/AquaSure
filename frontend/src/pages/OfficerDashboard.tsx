import { AlertTriangle, Download, TrendingUp, TrendingDown, MapPin, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function OfficerDashboard() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Generate realistic time-series data
    const data = Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      pH: 7.2 + Math.random() * 0.8 - 0.4,
      turbidity: 3.5 + Math.random() * 2,
      temperature: 22 + Math.random() * 4,
      conductivity: 450 + Math.random() * 100,
    }));
    setChartData(data);
  }, []);
  const handleDownloadReport = () => {
  let csvContent = "data:text/csv;charset=utf-8,";

  // Monitoring Stations
  csvContent += "Monitoring Stations\n";
  csvContent += "Name,Status,Active Alerts,Latitude,Longitude\n";
  monitoringStations.forEach(station => {
    csvContent += `${station.name},${station.status},${station.alerts},${station.lat},${station.lon}\n`;
  });

  csvContent += "\nPollution Events\n";
  csvContent += "Station,Event,Severity,Time\n";
  pollutionEvents.forEach(event => {
    csvContent += `${event.station},${event.event},${event.severity},${event.time}\n`;
  });

  csvContent += "\nReal-Time Alerts\n";
  csvContent += "Message,Priority,Time\n";
  realtimeAlerts.forEach(alert => {
    csvContent += `${alert.message},${alert.priority},${alert.time}\n`;
  });

  csvContent += "\nSensor Data (24 Hour Trend)\n";
  csvContent += "Time,pH,Turbidity,Temperature,Conductivity\n";
  chartData.forEach(data => {
    csvContent += `${data.time},${data.pH},${data.turbidity},${data.temperature},${data.conductivity}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Environmental_Report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  const monitoringStations = [
    { id: 1, name: "Station A - Industrial Zone", status: "critical", alerts: 3, lat: "40.7128", lon: "-74.0060" },
    { id: 2, name: "Station B - Residential Area", status: "warning", alerts: 1, lat: "40.7589", lon: "-73.9851" },
    { id: 3, name: "Station C - Agricultural Zone", status: "safe", alerts: 0, lat: "40.6782", lon: "-73.9442" },
    { id: 4, name: "Station D - River Outlet", status: "safe", alerts: 0, lat: "40.7489", lon: "-73.9680" },
  ];

  const pollutionEvents = [
    { id: 1, station: "Station A", event: "High Turbidity Detected", severity: "critical", time: "10 min ago" },
    { id: 2, station: "Station A", event: "pH Level Above Threshold", severity: "critical", time: "25 min ago" },
    { id: 3, station: "Station B", event: "Temperature Spike", severity: "warning", time: "1 hour ago" },
    { id: 4, station: "Station A", event: "Conductivity Anomaly", severity: "critical", time: "2 hours ago" },
  ];

  const realtimeAlerts = [
    { id: 1, message: "Critical pH violation at Station A", time: "2 min ago", priority: "high" },
    { id: 2, message: "Turbidity warning at Station B", time: "15 min ago", priority: "medium" },
    { id: 3, message: "Temperature spike at Station A", time: "32 min ago", priority: "high" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2A2F]">Environmental Officer Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">National Environmental Command Center</p>
        </div>
        <button 
        onClick={handleDownloadReport}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
          <Download size={18} />
          Download Report
        </button>
      </div>

      {/* Monitoring Stations Grid */}
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
        <h2 className="text-lg font-semibold text-[#0A2A2F] mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-[#1F7A8C]" />
          Monitoring Stations Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {monitoringStations.map((station) => (
            <div
              key={station.id}
              className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-xl p-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0A2A2F]">{station.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Lat: {station.lat}, Lon: {station.lon}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    station.status === "critical"
                      ? "bg-red-100 text-[#E74C3C]"
                      : station.status === "warning"
                      ? "bg-yellow-100 text-[#F39C12]"
                      : "bg-green-100 text-[#2ECC71]"
                  }`}
                >
                  {station.status.toUpperCase()}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <AlertTriangle
                  size={16}
                  className={station.alerts > 0 ? "text-[#E74C3C]" : "text-gray-300"}
                />
                <span className="text-sm text-gray-600">
                  {station.alerts} active {station.alerts === 1 ? "alert" : "alerts"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-Time Alerts Feed & Pollution Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-Time Alert Feed */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-semibold text-[#0A2A2F] mb-4 flex items-center gap-2">
            <Activity size={20} className="text-[#E74C3C] animate-pulse" />
            Real-Time Alert Feed
          </h2>
          <div className="space-y-3">
            {realtimeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`backdrop-blur-sm bg-white/60 border-l-4 rounded-lg p-4 ${
                  alert.priority === "high" ? "border-[#E74C3C]" : "border-[#F39C12]"
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

        {/* Pollution Event Table */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-semibold text-[#0A2A2F] mb-4">Pollution Event Table</h2>
          <div className="space-y-2">
            {pollutionEvents.map((event) => (
              <div
                key={event.id}
                className="backdrop-blur-sm bg-white/60 border border-white/30 rounded-lg p-3 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#0A2A2F]">{event.event}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.station}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{event.time}</span>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        event.severity === "critical" ? "bg-[#E74C3C]" : "bg-[#F39C12]"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* pH Trend */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-[#0A2A2F] mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#1F7A8C]" />
            pH Level Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BFE9F0" />
              <XAxis dataKey="time" stroke="#0A2A2F" style={{ fontSize: 12 }} />
              <YAxis stroke="#0A2A2F" style={{ fontSize: 12 }} domain={[6, 9]} />
              <Tooltip contentStyle={{ background: "rgba(255,255,255,0.9)", border: "1px solid #BFE9F0", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="pH" stroke="#1F7A8C" strokeWidth={2} dot={{ fill: "#1F7A8C", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Turbidity Trend */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-[#0A2A2F] mb-4 flex items-center gap-2">
            <TrendingDown size={18} className="text-[#F39C12]" />
            Turbidity Trend (NTU)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BFE9F0" />
              <XAxis dataKey="time" stroke="#0A2A2F" style={{ fontSize: 12 }} />
              <YAxis stroke="#0A2A2F" style={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "rgba(255,255,255,0.9)", border: "1px solid #BFE9F0", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="turbidity" stroke="#F39C12" strokeWidth={2} dot={{ fill: "#F39C12", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Temperature Trend */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-[#0A2A2F] mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#E74C3C]" />
            Temperature Trend (°C)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BFE9F0" />
              <XAxis dataKey="time" stroke="#0A2A2F" style={{ fontSize: 12 }} />
              <YAxis stroke="#0A2A2F" style={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "rgba(255,255,255,0.9)", border: "1px solid #BFE9F0", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="temperature" stroke="#E74C3C" strokeWidth={2} dot={{ fill: "#E74C3C", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Electrical Conductivity Trend */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-[#0A2A2F] mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#2ECC71]" />
            Conductivity Trend (μS/cm)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BFE9F0" />
              <XAxis dataKey="time" stroke="#0A2A2F" style={{ fontSize: 12 }} />
              <YAxis stroke="#0A2A2F" style={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "rgba(255,255,255,0.9)", border: "1px solid #BFE9F0", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="conductivity" stroke="#2ECC71" strokeWidth={2} dot={{ fill: "#2ECC71", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
