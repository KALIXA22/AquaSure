import { Droplets, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export type UserRole = "officer" | "operator" | "technician" | "researcher" | "admin";

interface LoginViewProps {
  onLogin: (email: string, password: string, role?: UserRole) => void;
  onSwitchToSignup: () => void;
}

export function LoginView({ onLogin, onSwitchToSignup }: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin"); // ✅ new state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password, selectedRole);
    }
  };

  const handleQuickAccess = (role: UserRole) => {
    onLogin(`${role}@aquasure.com`, "demo123", role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2A2F] via-[#1F7A8C] to-[#0A2A2F] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1F7A8C] to-[#BFE9F0] rounded-2xl shadow-lg mb-4">
              <Droplets size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">AquaSure</h1>
            <p className="text-[#BFE9F0] text-sm">Environmental Monitoring System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aquasure.com"
                className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#BFE9F0]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#BFE9F0]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#BFE9F0]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Select Role
              <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole( e.target.value as UserRole)}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#BFE9F0] focus:ring-2 focus:ring-[#BFE9F0]/50 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="officer" className="bg-[#0A2A2F] text-white">Environmental Officer</option>
                  <option value="operator" className="bg-[#0A2A2F] text-white">Industry Operator</option>
                  <option value="technician" className="bg-[#0A2A2F] text-white">Technician</option>
                  <option value="researcher" className="bg-[#0A2A2F] text-white">Researcher</option>
                  <option value="admin" className="bg-[#0A2A2F] text-white">Administrator</option>
                </select>
              </label>
            </div>

          
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#1F7A8C]"
                />
                <span className="text-white text-sm">Remember me</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] text-white font-semibold rounded-xl shadow-lg"
            >
              Sign In
            </button>
          </form>
        </div>
         <div className="text-center">
            <p className="text-white/70 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-[#BFE9F0] hover:text-white font-semibold transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>

        {/* Quick Access Demo Buttons */}
        <div className="mt-6">
          <p className="text-white/70 text-sm mb-2">Quick Access (Demo):</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleQuickAccess("officer")} className="py-2 px-2 bg-white/10 rounded-xl text-white">Officer</button>
            <button onClick={() => handleQuickAccess("operator")} className="py-2 px-2 bg-white/10 rounded-xl text-white">Operator</button>
            <button onClick={() => handleQuickAccess("technician")} className="py-2 px-2 bg-white/10 rounded-xl text-white">Technician</button>
            <button onClick={() => handleQuickAccess("researcher")} className="py-2 px-2 bg-white/10 rounded-xl text-white">Researcher</button>
            <button onClick={() => handleQuickAccess("admin")} className="col-span-2 py-2 px-2 bg-white/10 rounded-xl text-white">Admin Panel</button>
          </div>
        </div>
      </div>
    </div>
  );
}