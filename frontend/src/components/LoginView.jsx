import { Droplets, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

/**
 * @param {Object} props
 * @param {Function} props.onLogin - Callback when user logs in
 * @param {Function} props.onSwitchToSignup - Callback to switch to signup view
 */
export function LoginView({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001a2e] via-[#0d47a1] to-[#001a2e] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Animated Waves */}
        <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="currentColor" className="text-cyan-300 animate-pulse"></path>
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Creative Visual */}
          <div className="hidden md:flex flex-col items-center justify-center relative z-10">
            {/* Floating Card with Animation */}
            <div className="relative">
              {/* Animated Background Squares */}
              <div className="absolute inset-0 grid grid-cols-2 gap-4 -z-10">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl transform rotate-6 animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl transform -rotate-6 animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl transform rotate-6 animate-pulse opacity-40" style={{ animationDelay: '1.5s' }}></div>
                <div className="bg-gradient-to-br from-cyan-300 to-blue-400 rounded-3xl transform -rotate-6 animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
              </div>

              {/* Main Logo Card */}
              <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col items-center">
                  <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-cyan-400 to-blue-600 p-6 rounded-2xl shadow-xl">
                      <Droplets size={48} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">AquaSure</h2>
                  <p className="text-cyan-200 text-center text-lg mb-4">Environmental Monitoring System</p>
                  <div className="flex gap-4 mt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60"></div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60"></div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60"></div>
                  </div>
                </div>
              </div>

              {/* Floating Particles */}
              <div className="absolute top-10 right-10 w-4 h-4 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute bottom-20 left-5 w-3 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/3 right-0 w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 text-center">
              <div className="text-white">
                <p className="text-xl font-bold text-cyan-300">24/7</p>
                <p className="text-sm text-gray-300">Monitoring</p>
              </div>
              <div className="text-white">
                <p className="text-xl font-bold text-blue-300">100%</p>
                <p className="text-sm text-gray-300">Secure</p>
              </div>
              <div className="text-white">
                <p className="text-xl font-bold text-purple-300">Real-Time</p>
                <p className="text-sm text-gray-300">Analytics</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8 md:hidden">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-lg mb-4">
                  <Droplets size={28} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">AquaSure</h1>
                <p className="text-cyan-300 text-xs">Welcome back</p>
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
              <p className="text-gray-300 text-sm mb-8">Enter your credentials to access your account</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-60" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 group-hover:border-cyan-400/50 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-60" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 group-hover:border-cyan-400/50 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button type="button" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-300">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Create one
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}