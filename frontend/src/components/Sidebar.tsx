import { Activity, Droplets, AlertTriangle, Settings, BarChart3, Home, LogOut, ShieldCheck, Users, MapPin, Wrench, Database, FileText, Gauge, TrendingUp } from "lucide-react";
import { UserRole } from "./LoginView";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  userName?: string;
  userRole: UserRole;
}

export function Sidebar({ activeView, onViewChange, onLogout, userName = "Admin", userRole }: SidebarProps) {
  const getMenuItems = () => {
    if (userRole === "admin") {
      return [
        { icon: Home, label: "Dashboard", id: "dashboard" },
        { icon: Droplets, label: "Water Quality", id: "water-quality" },
        { icon: Activity, label: "Sensors", id: "sensors" },
        { icon: BarChart3, label: "Analytics", id: "analytics" },
        { icon: AlertTriangle, label: "Alerts", id: "alerts" },
        { icon: Users, label: "User Management", id: "user-management" },
        { icon: Settings, label: "Settings", id: "settings" },
      ];
    }

    // Environmental Officer menu items
    if (userRole === "officer") {
      return [
        { icon: Home, label: "Command Center", id: "dashboard" },
      
      ];
    }

    // Industry Operator menu items
    if (userRole === "operator") {
      return [
        { icon: Home, label: "My Station", id: "dashboard" },
     
      ];
    }

    // Technician menu items
    if (userRole === "technician") {
      return [
        { icon: Home, label: "Maintenance Hub", id: "dashboard" },
    
      ];
    }

    // Researcher menu items
    if (userRole === "researcher") {
      return [
        { icon: Home, label: "Data Overview", id: "dashboard" },
      
      ];
    }

    // Default fallback
    return [
      { icon: Home, label: "Dashboard", id: "dashboard" },
    ];
  };

  const menuItems = getMenuItems();

  const getRoleLabel = (role: UserRole): string => {
    const roleLabels: Record<UserRole, string> = {
      admin: "System Administrator",
      officer: "Environmental Officer",
      operator: "Industry Operator",
      technician: "System Technician",
      researcher: "Research Analyst",
    };
    return roleLabels[role];
  };

  const getRoleBadgeColor = (role: UserRole): string => {
    const badgeColors: Record<UserRole, string> = {
      admin: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      officer: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      operator: "bg-green-500/20 text-green-300 border-green-500/30",
      technician: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      researcher: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    };
    return badgeColors[role];
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#0A2A2F] to-[#1F7A8C]/20 backdrop-blur-xl border-r border-white/10 text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1F7A8C] to-[#BFE9F0] rounded-lg flex items-center justify-center shadow-lg">
            <Droplets size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl">AquaSure</h1>
            <p className="text-xs text-[#BFE9F0]">Environmental Monitor</p>
          </div>
        </div>
      </div>

      {/* Role Badge */}
      <div className="px-4 py-3">
        <div className={`${getRoleBadgeColor(userRole)} border rounded-lg px-3 py-2 text-center`}>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck size={14} />
            <span className="text-xs font-semibold">{getRoleLabel(userRole)}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeView === item.id
                    ? "bg-white/20 backdrop-blur-sm text-white shadow-lg border border-white/30"
                    : "text-gray-300 hover:bg-white/10 hover:backdrop-blur-sm hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-white/10 space-y-3">
   
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1F7A8C] to-[#BFE9F0] rounded-full flex items-center justify-center text-sm font-bold">
              {userName.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{userName}</p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#2ECC71] rounded-full"></div>
                <p className="text-xs text-[#BFE9F0]">Active</p>
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 rounded-lg text-sm transition-all duration-200"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

    
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-[#2ECC71] rounded-full animate-pulse shadow-lg shadow-[#2ECC71]/50"></div>
            <span className="text-xs font-medium">System Online</span>
          </div>
          <p className="text-xs text-gray-400">Last updated: Just now</p>
        </div>
      </div>
    </div>
  );
}