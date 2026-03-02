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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  const handleQuickAccess = (role: UserRole) => {
    // Demo login with predefined credentials
    onLogin(`${role}@aquasure.com`, "demo123", role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2A2F] via-[#1F7A8C] to-[#0A2A2F] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-[#BFE9F0] rounded-full blur-3xl opacity-20 -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#1F7A8C] rounded-full blur-3xl opacity-20 -bottom-32 -right-32 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1F7A8C] to-[#BFE9F0] rounded-2xl shadow-lg mb-4">
              <Droplets size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">AquaSure</h1>
            <p className="text-[#BFE9F0] text-sm">Environmental Monitoring System</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BFE9F0]" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aquasure.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#BFE9F0] focus:ring-2 focus:ring-[#BFE9F0]/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BFE9F0]" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#BFE9F0] focus:ring-2 focus:ring-[#BFE9F0]/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#BFE9F0] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#1F7A8C]"
                />
                <span className="text-sm text-white">Remember me</span>
              </label>
              <button type="button" className="text-sm text-[#BFE9F0] hover:text-white transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/70">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
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
        </div>

        {/* Quick Access (Demo) */}
        <div className="mt-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6">
          <p className="text-white/70 text-sm mb-4">Quick Access (Demo):</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickAccess("officer")}
              className="py-2.5 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm font-medium hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
            >
              Officer
            </button>
            <button
              onClick={() => handleQuickAccess("operator")}
              className="py-2.5 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm font-medium hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
            >
              Operator
            </button>
            <button
              onClick={() => handleQuickAccess("technician")}
              className="py-2.5 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm font-medium hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
            >
              Technician
            </button>
            <button
              onClick={() => handleQuickAccess("researcher")}
              className="py-2.5 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm font-medium hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
            >
              Researcher
            </button>
          </div>
          <button
            onClick={() => handleQuickAccess("admin")}
            className="w-full mt-3 py-2.5 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm font-medium hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
          >
            Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}