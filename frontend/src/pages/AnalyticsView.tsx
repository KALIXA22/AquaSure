import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Activity, AlertCircle } from "lucide-react";

const monthlyData = [
  { month: "Jan", alerts: 12, uptime: 99.8, avgPh: 7.2 },
  { month: "Feb", alerts: 8, uptime: 99.9, avgPh: 7.3 },
  { month: "Mar", alerts: 15, uptime: 99.5, avgPh: 7.1 },
  { month: "Apr", alerts: 6, uptime: 99.9, avgPh: 7.2 },
  { month: "May", alerts: 10, uptime: 99.7, avgPh: 7.4 },
  { month: "Jun", alerts: 9, uptime: 99.8, avgPh: 7.2 },
];

export function AnalyticsView() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-2">Historical data analysis and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#2ECC71]/10 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-[#2ECC71]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg System Uptime</p>
              <p className="text-2xl font-bold text-gray-900">99.8%</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">+0.2% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#1F7A8C]/10 rounded-lg flex items-center justify-center">
              <Activity size={24} className="text-[#1F7A8C]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Data Points Collected</p>
              <p className="text-2xl font-bold text-gray-900">2.4M</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Last 30 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#F39C12]/10 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} className="text-[#F39C12]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900">60</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Last 6 months</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Alert Trends</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height={256}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                />
                <Bar dataKey="alerts" fill="#1F7A8C" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">System Uptime History</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height={256}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis domain={[99, 100]} stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="uptime" 
                  stroke="#2ECC71" 
                  strokeWidth={3}
                  dot={{ fill: "#2ECC71", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
