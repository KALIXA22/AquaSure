import { AlertTriangle,AlertCircle,Info,CheckCircle,X,Filter } from "lucide-react";
import { useState } from "react";

interface Alert {
    id:number,
    type: "warning" | "critical" | "info",
    message:string,
    timestamp:string,
    location:string,
    resolved:boolean,
    description:string,
}
const allAlerts:Alert[] = [
    {
        id:1,
        type:"critical",
        message:"Turbidity levels exceeding threshold",
        timestamp:"2026-02-27 14:23",
        location:"Sensor B-12",
        resolved:false,
        description:"Turbidity measured at 3.2 NTU, exceeding the safe threshold of 2.5 NTU."
    },
    {
        id:2,
        type:"warning",
        message:"pH fluctuation detected",
        timestamp:"2026-02-27 13:45",
        location:"Sensor A-04",
        resolved:false,
        description:"pH levels fluctuating outside normal range of 6.5-8.5."

    },
     {
        id:3,
        type:"info",
        message:"Scheduled maintenance due in 2 days",
        timestamp:"2026-02-27 09:00",
        location:"System",
        resolved:false,
        description:"Routine maintenance scheduled for all sensors. Expected downtime of 1 hour."

    },
    {
        id:4,
        type:"warning",
        message:"Low battery warning",
        timestamp:"2026-02-26 18:30",
        location:"Sensor B-03",
        resolved:false,
        description:"Battery level at 15%,replacement recommended"
    },
    {
        id:5,
        type:"critical",
        message:"Temperature spike detected",
        timestamp:"2026-02-26 17:45",
        location:"Sensor A-02",
        resolved:false,
        description:"Temperature readings exceeded safe threshold of 35°C. Immediate investigation required."
    },
     {
        id:6,
        type:"info",
        message:"System update completed",
        timestamp:"2026-02-26 17:45",
        location:"System",
        resolved:false,
        description:"System update completed successfully. All sensors are now running the latest firmware version."
    },
];

export function AlertsView() {
    const[alerts,setAlerts] = useState<Alert[]>(allAlerts);
    const[filter,setFilter] = useState<"all" | "active" | "resolved">("all");
    const[typeFilter,setTypeFilter] = useState<"all" | "warning" | "critical" | "info">("all");

    const resolveAlert = (id:number) => {
        setAlerts(alerts.map(alert=>
            alert.id === id ? {...alert,resolved:true} : alert
        ));
    };

    const deleteAlert = (id:number) => {
        setAlerts(alerts.filter(alert=>alert.id !== id));
    };

    const getAlertConfig=(type:Alert["type"])=>{
        switch(type){
            case "critical":
                return{
                    icon:AlertTriangle,
                    bgColor:"bg-[#E74C3C]/10",
                    textColor:"text-[#E74C3C]",
                    borderColor:"border-1-[#E74C3C]"
                };
            case "warning":
                return{
                    icon:AlertCircle,
                    bgColor:"bg-[#F39C12]/10",
                    textColor:"text-[#F39C12]",
                    borderColor:"border-1-[#F39C12]"
                };
            case "info":
                return{
                    icon:Info,
                    bgColor:"bg-[#1F7A8C]/10",
                    textColor:"text-[#1F7A8C]",
                    borderColor:"border-1-[#1F7A8C]",
                };
        }
    };
    
    const filteredAlerts = alerts.filter(alert=>{
        if(filter === "active" && alert.resolved) return false;
        if(filter === "resolved" && !alert.resolved) return false;
        if(typeFilter !== "all" && alert.type !== typeFilter) return false;
        return true;
   });
   const activeCount = alerts.filter(alert=>!alert.resolved).length;
   const criticalCount = alerts.filter(alert=>alert.type === "critical").length;

   return(
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alert Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage system alerts and notifications</p>
      </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{activeCount}</p>
            </div>
            <AlertCircle size={32} className="text-[#F39C12]" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{criticalCount}</p>
            </div>
            <AlertTriangle size={32} className="text-[#E74C3C]" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{alerts.filter(a => a.resolved).length}</p>
            </div>
            <CheckCircle size={32} className="text-[#2ECC71]" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all" ? "bg-[#1F7A8C] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "active" ? "bg-[#1F7A8C] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "resolved" ? "bg-[#1F7A8C] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Resolved
            </button>
          </div>
          <div className="border-l border-gray-300 h-8"></div>
          <div className="flex gap-2">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                typeFilter === "all" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter("critical")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                typeFilter === "critical" ? "bg-[#E74C3C] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setTypeFilter("warning")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                typeFilter === "warning" ? "bg-[#F39C12] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Warning
            </button>
            <button
              onClick={() => setTypeFilter("info")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                typeFilter === "info" ? "bg-[#1F7A8C] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Info
            </button>
          </div>
        </div>
      </div>
       <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <CheckCircle size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No alerts found</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;
            
            return (
              <div
                key={alert.id}
                className={`bg-white rounded-xl shadow-md border-l-4 ${config.borderColor} p-6 ${
                  alert.resolved ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {alert.resolved ? (
                      <CheckCircle size={20} className="text-[#2ECC71]" />
                    ) : (
                      <Icon size={20} className={config.textColor} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{alert.message}</h3>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      </div>
                      {alert.resolved && (
                        <span className="px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] rounded-full text-xs font-medium">
                          Resolved
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                      <span>{alert.location}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                      <span>•</span>
                      <span className={`font-medium ${config.textColor}`}>
                        {alert.type.toUpperCase()}
                      </span>
                    </div>
                    
                    {!alert.resolved && (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="px-4 py-2 bg-[#2ECC71] text-white rounded-lg text-sm font-medium hover:bg-[#2ECC71]/90 transition-colors"
                        >
                          Mark as Resolved
                        </button>
                        <button
                          onClick={() => deleteAlert(alert.id)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          <X size={16} className="inline mr-1" />
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      </div>


   )
}

    