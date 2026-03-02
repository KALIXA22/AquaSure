import { Droplets, TrendingUp, TrendingDown } from "lucide-react";

export function WaterQualityView() {
  const qualityMetrics = [
    { name: "pH Level", value: 7.2, status: "Optimal", trend: "stable", change: "+0.1" },
    { name: "Dissolved Oxygen", value: 8.5, unit: "mg/L", status: "Good", trend: "up", change: "+0.3" },
    { name: "Total Dissolved Solids", value: 340, unit: "ppm", status: "Acceptable", trend: "down", change: "-12" },
    { name: "Chlorine", value: 1.2, unit: "mg/L", status: "Optimal", trend: "stable", change: "0.0" },
    { name: "Alkalinity", value: 120, unit: "mg/L", status: "Good", trend: "up", change: "+5" },
    { name: "Hardness", value: 180, unit: "mg/L", status: "Moderate", trend: "stable", change: "+2" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Water Quality Analysis</h1>
        <p className="text-gray-600 mt-2">Detailed water chemistry and quality parameters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qualityMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1F7A8C]/10 rounded-lg flex items-center justify-center">
                  <Droplets size={24} className="text-[#1F7A8C]" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-600">{metric.name}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    {metric.unit && <span className="text-sm text-gray-600">{metric.unit}</span>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#2ECC71]">{metric.status}</span>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                {metric.trend === "up" && <TrendingUp size={16} className="text-[#2ECC71]" />}
                {metric.trend === "down" && <TrendingDown size={16} className="text-[#E74C3C]" />}
                <span className={metric.trend === "up" ? "text-[#2ECC71]" : metric.trend === "down" ? "text-[#E74C3C]" : "text-gray-600"}>
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Water Quality Summary</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="mb-3">
            Overall water quality is rated as <strong className="text-[#2ECC71]">Good</strong>. 
            All parameters are within acceptable ranges for safe consumption and environmental standards.
          </p>
          <ul className="space-y-2 text-sm">
            <li>• pH levels are stable and within optimal range (6.5-8.5)</li>
            <li>• Dissolved oxygen content is healthy for aquatic life</li>
            <li>• Total dissolved solids are decreasing, indicating improving water quality</li>
            <li>• Chlorine levels are appropriate for disinfection</li>
            <li>• Alkalinity and hardness are within normal parameters</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
