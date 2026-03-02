import { Bell, Search, User, Wifi, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  onNotificationClick: () => void;
  notificationCount: number;
  userName?: string;
}

export function Header({ onNotificationClick, notificationCount, userName = "Admin" }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      // In a real app, this would trigger a search function
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };
``
  return (
    <header className="backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search sensors, locations, alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/20 transition-all placeholder-gray-500"
              />
            </div>
          </form>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-3 ml-8">
          {/* Date & Time */}
          <div className="hidden lg:flex items-center gap-4 px-4 py-2 backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar size={16} className="text-[#1F7A8C]" />
              <span className="font-medium">{formatDate(currentTime)}</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock size={16} className="text-[#1F7A8C]" />
              <span className="font-mono font-medium">{formatTime(currentTime)}</span>
            </div>
          </div>

          {/* System Health */}
          <div className="flex items-center gap-2 px-4 py-2.5 backdrop-blur-sm bg-[#2ECC71]/10 border border-[#2ECC71]/30 text-[#2ECC71] rounded-xl shadow-sm">
            <Wifi size={18} />
            <span className="text-sm font-medium hidden md:inline">All Systems Operational</span>
            <span className="text-sm font-medium md:hidden">Online</span>
          </div>

          {/* Notifications */}
          <button 
            onClick={onNotificationClick}
            className="relative p-2.5 hover:bg-white/50 backdrop-blur-sm rounded-xl transition-all border border-transparent hover:border-white/30"
          >
            <Bell size={20} className="text-gray-600" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <span className="text-[10px] font-bold text-white">{notificationCount}</span>
              </div>
            )}
          </button>

          {/* User */}
          <button className="flex items-center gap-3 px-3 py-2 hover:bg-white/50 backdrop-blur-sm rounded-xl transition-all border border-transparent hover:border-white/30">
            <div className="w-9 h-9 bg-gradient-to-br from-[#1F7A8C] to-[#BFE9F0] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">{userName.charAt(0)}</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-700">{userName}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}