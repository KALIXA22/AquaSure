
import {  FileSpreadsheet, Filter, TrendingUp, Calendar, Database } from "lucide-react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function ResearcherDashboard() {
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState("30days");
  const [selectedParameter, setSelectedParameter] = useState("all");

  useEffect(() => {
    // Generate long-term historical data
    const dataPoints = dateRange === "30days" ? 30 : dateRange === "90days" ? 90 : 365;
    const data = Array.from({ length: dataPoints }, (_, i) => ({
      date: new Date(Date.now() - (dataPoints - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      pH: 7.2 + Math.random() * 0.8 - 0.4,
      turbidity: 3.5 + Math.random() * 2,
      temperature: 22 + Math.random() * 4,
      conductivity: 450 + Math.random() * 100,
    }));
    setHistoricalData(data);
  }, [dateRange]);

  const tableData = [
    { date: "2025-03-02", time: "14:30", pH: 7.4, turbidity: 3.8, temp: 24.2, conductivity: 478 },
    { date: "2025-03-02", time: "14:00", pH: 7.3, turbidity: 3.9, temp: 24.1, conductivity: 482 },
    { date: "2025-03-02", time: "13:30", pH: 7.5, turbidity: 3.7, temp: 24.3, conductivity: 475 },
    { date: "2025-03-02", time: "13:00", pH: 7.2, turbidity: 4.1, temp: 23.9, conductivity: 485 },
    { date: "2025-03-02", time: "12:30", pH: 7.4, turbidity: 3.6, temp: 24.0, conductivity: 479 },
  ];

  const handleExportCSV = () => {
    const csvContent = [
      ["Date", "Time", "pH", "Turbidity (NTU)", "Temperature (°C)", "Conductivity (μS/cm)"],
      ...tableData.map(row => [row.date, row.time, row.pH, row.turbidity, row.temp, row.conductivity])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `water_quality_data_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2A2F]">Researcher Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Scientific Data Analysis Interface</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
        >
          <FileSpreadsheet size={18} />
          Export CSV
        </button>
      </div>

      {/* Data Filtering Tools */}
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-[#1F7A8C]" />
          <h2 className="text-lg font-semibold text-[#0A2A2F]">Data Filtering Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Time Period</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-xl text-[#0A2A2F] focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/30 transition-all"
            >
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="365days">Last Year</option>
            </select>
          </div>

          {/* Parameter Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Parameter</label>
            <select
              value={selectedParameter}
              onChange={(e) => setSelectedParameter(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-xl text-[#0A2A2F] focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/30 transition-all"
            >
              <option value="all">All Parameters</option>
              <option value="pH">pH Level</option>
              <option value="turbidity">Turbidity</option>
              <option value="temperature">Temperature</option>
              <option value="conductivity">Electrical Conductivity</option>
            </select>
          </div>

          {/* Station Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Monitoring Station</label>
            <select
              className="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-xl text-[#0A2A2F] focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/30 transition-all"
            >
              <option value="all">All Stations</option>
              <option value="station-a">Station A</option>
              <option value="station-b">Station B</option>
              <option value="station-c">Station C</option>
              <option value="station-d">Station D</option>
            </select>
          </div>
        </div>
      </div>

      {/* Long-Term Trend Graphs */}
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={20} className="text-[#1F7A8C]" />
          <h2 className="text-lg font-semibold text-[#0A2A2F]">Long-Term Trend Analysis</h2>
        </div>

        {/* Multi-Parameter Chart */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">All Parameters Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BFE9F0" />
              <XAxis dataKey="date" stroke="#0A2A2F" style={{ fontSize: 11 }} />
              <YAxis stroke="#0A2A2F" style={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid #BFE9F0",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="pH" stroke="#1F7A8C" strokeWidth={2} dot={false} name="pH" />
              <Line type="monotone" dataKey="turbidity" stroke="#F39C12" strokeWidth={2} dot={false} name="Turbidity (NTU)" />
              <Line type="monotone" dataKey="temperature" stroke="#E74C3C" strokeWidth={2} dot={false} name="Temperature (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Individual Parameter Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">pH Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#BFE9F0" />
                <XAxis dataKey="date" stroke="#0A2A2F" style={{ fontSize: 10 }} />
                <YAxis stroke="#0A2A2F" style={{ fontSize: 10 }} domain={[6, 9]} />
                <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #BFE9F0", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="pH" stroke="#1F7A8C" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Conductivity Trend (μS/cm)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#BFE9F0" />
                <XAxis dataKey="date" stroke="#0A2A2F" style={{ fontSize: 10 }} />
                <YAxis stroke="#0A2A2F" style={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #BFE9F0", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="conductivity" stroke="#2ECC71" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Historical Data Table */}
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Database size={20} className="text-[#1F7A8C]" />
            <h2 className="text-lg font-semibold text-[#0A2A2F]">Historical Data Records</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>Read-Only Access</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#BFE9F0]/30 border-b border-[#1F7A8C]/20">
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0A2A2F]">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0A2A2F]">Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0A2A2F]">pH</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0A2A2F]">Turbidity (NTU)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0A2A2F]">Temp (°C)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#0A2A2F]">Conductivity (μS/cm)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-white/40 hover:bg-white/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-[#0A2A2F]">{row.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{row.time}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#0A2A2F]">{row.pH}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#0A2A2F]">{row.turbidity}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#0A2A2F]">{row.temp}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#0A2A2F]">{row.conductivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing 5 of 1,247 records</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white/60 rounded-lg hover:bg-white/80 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-white/60 rounded-lg hover:bg-white/80 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Read-Only Notice */}
      <div className="backdrop-blur-xl bg-blue-50/70 border border-blue-200/40 rounded-2xl shadow-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Database size={18} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">Read-Only Research Access</h3>
            <p className="text-sm text-blue-700">
              You have read-only access to all historical data. No system control or modification capabilities are available.
              All data can be exported for external analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
