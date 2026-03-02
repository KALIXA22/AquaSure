import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface MainChartProps {
  timePeriod: "24H" | "7D" | "30D";
  onTimePeriodChange: (period: "24H" | "7D" | "30D") => void;
}

const generate24HData = () => [
  { time: "00:00", ph: 7.2, temp: 22, turbidity: 1.8, conductivity: 450 },
  { time: "04:00", ph: 7.3, temp: 21.5, turbidity: 1.9, conductivity: 455 },
  { time: "08:00", ph: 7.1, temp: 23, turbidity: 2.1, conductivity: 460 },
  { time: "12:00", ph: 7.4, temp: 24, turbidity: 2.3, conductivity: 470 },
  { time: "16:00", ph: 7.2, temp: 25, turbidity: 2.8, conductivity: 465 },
  { time: "20:00", ph: 7.3, temp: 23.5, turbidity: 2.5, conductivity: 458 },
  { time: "24:00", ph: 7.2, temp: 22, turbidity: 2.0, conductivity: 452 },
];

const generate7DData = () => [
  { time: "Mon", ph: 7.2, temp: 22.5, turbidity: 2.0, conductivity: 455 },
  { time: "Tue", ph: 7.3, temp: 23.0, turbidity: 2.2, conductivity: 460 },
  { time: "Wed", ph: 7.1, temp: 23.5, turbidity: 2.4, conductivity: 465 },
  { time: "Thu", ph: 7.4, temp: 24.0, turbidity: 2.6, conductivity: 470 },
  { time: "Fri", ph: 7.2, temp: 24.5, turbidity: 2.8, conductivity: 468 },
  { time: "Sat", ph: 7.3, temp: 23.5, turbidity: 2.5, conductivity: 462 },
  { time: "Sun", ph: 7.2, temp: 22.8, turbidity: 2.1, conductivity: 456 },
];

const generate30DData = () => [
  { time: "Week 1", ph: 7.2, temp: 22.0, turbidity: 2.0, conductivity: 450 },
  { time: "Week 2", ph: 7.3, temp: 23.5, turbidity: 2.3, conductivity: 460 },
  { time: "Week 3", ph: 7.1, temp: 24.0, turbidity: 2.5, conductivity: 468 },
  { time: "Week 4", ph: 7.4, temp: 23.0, turbidity: 2.2, conductivity: 455 },
];

export function MainChart({ timePeriod, onTimePeriodChange }: MainChartProps) {
  const getData = () => {
    switch (timePeriod) {
      case "24H":
        return generate24HData();
      case "7D":
        return generate7DData();
      case "30D":
        return generate30DData();
      default:
        return generate24HData();
    }
  };

  const waterQualityData = getData();

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/30 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {timePeriod === "24H" ? "24-Hour" : timePeriod === "7D" ? "7-Day" : "30-Day"} Water Quality Trends
          </h2>
          <p className="text-sm text-gray-600 mt-1">Real-time monitoring data from all sensors</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onTimePeriodChange("24H")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              timePeriod === "24H" 
                ? "bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] text-white shadow-md" 
                : "backdrop-blur-sm bg-white/50 border border-white/30 text-gray-700 hover:bg-white/70"
            }`}
          >
            24H
          </button>
          <button 
            onClick={() => onTimePeriodChange("7D")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              timePeriod === "7D" 
                ? "bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] text-white shadow-md" 
                : "backdrop-blur-sm bg-white/50 border border-white/30 text-gray-700 hover:bg-white/70"
            }`}
          >
            7D
          </button>
          <button 
            onClick={() => onTimePeriodChange("30D")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              timePeriod === "30D" 
                ? "bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] text-white shadow-md" 
                : "backdrop-blur-sm bg-white/50 border border-white/30 text-gray-700 hover:bg-white/70"
            }`}
          >
            30D
          </button>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={waterQualityData}>
            <defs>
              <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1F7A8C" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#1F7A8C" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="time" stroke="#6B7280" />
            <YAxis yAxisId="left" stroke="#6B7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="ph"
              stroke="#1F7A8C"
              strokeWidth={2}
              fill="url(#colorPh)"
              name="pH Level"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="temp"
              stroke="#2ECC71"
              strokeWidth={2}
              fill="url(#colorTemp)"
              name="Temperature (°C)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}