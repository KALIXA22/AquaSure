import { MapPin, Wifi, Battery, Calendar } from "lucide-react";

export function SensorsView() {
  const sensors = [
    { id: "A-01", name: "pH Sensor Alpha", location: "Tank 1 - North", status: "online",    battery: 92,  lastMaintenance: "2 days ago", type: "pH Monitor" },
    { id: "A-02", name: "Temperature Probe A", location: "Tank 1 - Center", status: "online", battery: 88, lastMaintenance: "5 days ago", type: "Temperature" },
    { id: "A-03", name: "Turbidity Sensor T1", location: "Tank 1 - South", status: "online", battery: 76,  lastMaintenance: "1 week ago", type: "Turbidity" },
    { id: "A-04", name: "Conductivity Meter C1", location: "Tank 1 - East", status: "online", battery: 95, lastMaintenance: "3 days ago", type: "Conductivity" },
    { id: "B-01", name: "pH Sensor Beta", location: "Tank 2 - North", status: "online",       battery: 84, lastMaintenance: "4 days ago", type: "pH Monitor" },
    { id: "B-02", name: "Temperature Probe B", location: "Tank 2 - Center", status: "online", battery: 91, lastMaintenance: "2 days ago", type: "Temperature" },
    { id: "B-03", name: "Turbidity Sensor T2", location: "Tank 2 - South", status: "warning", battery: 45, lastMaintenance: "2 weeks ago", type: "Turbidity" },
    { id: "B-04", name: "Conductivity Meter C2", location: "Tank 2 - East", status: "online", battery: 89, lastMaintenance: "6 days ago", type: "Conductivity" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sensor Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage all environmental sensors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sensors.map((sensor) => (
          <div key={sensor.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-500">{sensor.id}</span>
                  <span className={`w-2 h-2 rounded-full ${sensor.status === "online" ? "bg-[#2ECC71]" : "bg-[#F39C12]"}`}></span>
                </div>
                <h3 className="font-bold text-gray-900">{sensor.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{sensor.type}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                sensor.status === "online" 
                  ? "bg-[#2ECC71]/10 text-[#2ECC71]" 
                  : "bg-[#F39C12]/10 text-[#F39C12]"
              }`}>
                {sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin size={16} className="text-gray-400" />
                <span>{sensor.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Battery size={16} className="text-gray-400" />
                <span>Battery: {sensor.battery}%</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      sensor.battery > 70 ? "bg-[#2ECC71]" : sensor.battery > 40 ? "bg-[#F39C12]" : "bg-[#E74C3C]"
                    }`}
                    style={{ width: `${sensor.battery}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar size={16} className="text-gray-400" />
                <span>Last service: {sensor.lastMaintenance}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full py-2 bg-[#1F7A8C] text-white rounded-lg text-sm font-medium hover:bg-[#1F7A8C]/90 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
