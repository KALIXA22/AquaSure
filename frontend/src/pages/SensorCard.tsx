import { LucideIcon } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  status: "normal" | "warning" | "critical";
  icon: LucideIcon;
  data: Array<{ value: number }>;
  min: number;
  max: number;
  optimal: string;
}

export function SensorCard({ title, value, unit, status, icon: Icon, data, min, max, optimal }: SensorCardProps) {
  const statusColors = {
    normal: { bg: "bg-[#2ECC71]/10", text: "text-[#2ECC71]", border: "border-[#2ECC71]" },
    warning: { bg: "bg-[#F39C12]/10", text: "text-[#F39C12]", border: "border-[#F39C12]" },
    critical: { bg: "bg-[#E74C3C]/10", text: "text-[#E74C3C]", border: "border-[#E74C3C]" },
  };

  const statusLabels = {
    normal: "Normal",
    warning: "Warning",
    critical: "Critical",
  };

  const colors = statusColors[status];

  return (
    <div className="backdrop-blur-xl bg-white/80 border border-white/30 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 hover:scale-[1.02]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${colors.bg} backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md`}>
            <Icon size={24} className={colors.text} />
          </div>
          <div>
            <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-bold text-gray-900">{value}</span>
              <span className="text-gray-600 text-sm">{unit}</span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 ${colors.bg} ${colors.text} backdrop-blur-sm rounded-full text-xs font-medium border ${colors.border} shadow-sm`}>
          {statusLabels[status]}
        </div>
      </div>

      {/* Mini Chart */}
      <div className="h-16 mb-3 w-full">
        <ResponsiveContainer width="100%" height={64}>
          <LineChart data={data}>
            <YAxis domain={[min, max]} hide />
            <Line
              type="monotone"
              dataKey="value"
              stroke={status === "normal" ? "#2ECC71" : status === "warning" ? "#F39C12" : "#E74C3C"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div>
          <span className="font-medium">Range:</span> {min} - {max} {unit}
        </div>
        <div>
          <span className="font-medium">Optimal:</span> {optimal}
        </div>
      </div>
    </div>
  );
}