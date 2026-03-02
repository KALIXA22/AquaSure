import { SensorCard } from "./SensorCard";
import { AlertPanel } from "./AlertPanel";
import { MainChart } from "./MainChart";
import { SystemHealth } from "./SystemHealth";
import { Droplets, Waves, Thermometer, Zap } from "lucide-react";
import { useState, useEffect } from "react";

// Generate mock sensor data
const generateSensorData = (base, variance) => {
  return Array.from({ length: 20 }, (_, i) => ({
    value: base + Math.sin(i / 3) * variance + (Math.random() - 0.5) * variance * 0.5,
  }));
};

export function DashboardView() {
  const [timePeriod, setTimePeriod] = useState("24H");
  const [sensorData, setSensorData] = useState({
    ph: {
      value: 7.2,
      unit: "pH",
      status: "normal",
      data: generateSensorData(7.2, 0.3),
      min: 6.5,
      max: 8.5,
      optimal: "6.5 - 8.5",
    },
    turbidity: {
      value: 2.8,
      unit: "NTU",
      status: "warning",
      data: generateSensorData(2.5, 0.8),
      min: 0,
      max: 5,
      optimal: "< 1.0",
    },
    temperature: {
      value: 23.5,
      unit: "°C",
      status: "normal",
      data: generateSensorData(23, 2),
      min: 20,
      max: 26,
      optimal: "20 - 25",
    },
    conductivity: {
      value: 465,
      unit: "μS/cm",
      status: "normal",
      data: generateSensorData(460, 20),
      min: 400,
      max: 500,
      optimal: "400 - 500",
    },
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ph: {
          ...prev.ph,
          value: Number((7.2 + (Math.random() - 0.5) * 0.4).toFixed(1)),
          data: generateSensorData(7.2, 0.3),
        },
        turbidity: {
          ...prev.turbidity,
          value: Number((2.5 + (Math.random() - 0.5) * 1.0).toFixed(1)),
          data: generateSensorData(2.5, 0.8),
          status: (2.5 + (Math.random() - 0.5) * 1.0) > 2.5 ? "warning" : "normal",
        },
        temperature: {
          ...prev.temperature,
          value: Number((23 + (Math.random() - 0.5) * 3).toFixed(1)),
          data: generateSensorData(23, 2),
        },
        conductivity: {
          ...prev.conductivity,
          value: Math.round(460 + (Math.random() - 0.5) * 30),
          data: generateSensorData(460, 20),
        },
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Environmental Monitoring Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time water quality and environmental data</p>
      </div>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <SensorCard
          title="pH Level"
          value={sensorData.ph.value}
          unit={sensorData.ph.unit}
          status={sensorData.ph.status}
          icon={Droplets}
          data={sensorData.ph.data}
          min={sensorData.ph.min}
          max={sensorData.ph.max}
          optimal={sensorData.ph.optimal}
        />
        <SensorCard
          title="Turbidity"
          value={sensorData.turbidity.value}
          unit={sensorData.turbidity.unit}
          status={sensorData.turbidity.status}
          icon={Waves}
          data={sensorData.turbidity.data}
          min={sensorData.turbidity.min}
          max={sensorData.turbidity.max}
          optimal={sensorData.turbidity.optimal}
        />
        <SensorCard
          title="Temperature"
          value={sensorData.temperature.value}
          unit={sensorData.temperature.unit}
          status={sensorData.temperature.status}
          icon={Thermometer}
          data={sensorData.temperature.data}
          min={sensorData.temperature.min}
          max={sensorData.temperature.max}
          optimal={sensorData.temperature.optimal}
        />
        <SensorCard
          title="Electrical Conductivity"
          value={sensorData.conductivity.value}
          unit={sensorData.conductivity.unit}
          status={sensorData.conductivity.status}
          icon={Zap}
          data={sensorData.conductivity.data}
          min={sensorData.conductivity.min}
          max={sensorData.conductivity.max}
          optimal={sensorData.conductivity.optimal}
        />
      </div>

      {/* Main Chart */}
      <div className="mb-8">
        <MainChart timePeriod={timePeriod} onTimePeriodChange={setTimePeriod} />
      </div>

      {/* Bottom Grid - Alerts and System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AlertPanel />
        <SystemHealth />
      </div>
    </div>
  );
}