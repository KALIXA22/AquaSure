import { Droplets, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
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
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password, selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062229] via-[#0b3b46] to-[#1F7A8C] px-4 py-8 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-lg lg:grid-cols-2">
        <aside className="relative hidden flex-col overflow-hidden bg-gradient-to-br from-[#03191f] to-[#0a2f38] p-10 text-white lg:flex">
          <div className="pointer-events-none absolute -right-14 -top-10 h-40 w-40 rounded-full bg-[#8fe1ef]/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-[#1F7A8C]/35 blur-3xl" />
          <div className="pointer-events-none absolute right-16 top-28 h-2 w-2 animate-pulse rounded-full bg-[#bdebf2]" />
          <div className="pointer-events-none absolute right-24 top-36 h-3 w-3 animate-pulse rounded-full bg-[#9dd8e3] [animation-delay:300ms]" />
          <div className="pointer-events-none absolute right-10 top-44 h-2 w-2 animate-pulse rounded-full bg-[#d5f4f8] [animation-delay:700ms]" />
          <div>
            <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1F7A8C] to-[#BFE9F0] shadow-lg">
              <Droplets size={30} />
            </div>
            <h1 className="mb-3 text-4xl font-bold leading-tight">AquaSure</h1>
            <p className="max-w-md text-base text-[#cdeff4]">Secure sign-in for your monitoring workspace.</p>
            <div className="mt-7 overflow-hidden rounded-3xl border border-white/10 bg-[#0d3b45]/70 p-5 backdrop-blur-sm">
              <svg viewBox="0 0 420 220" className="h-52 w-full">
                <rect x="10" y="18" width="250" height="165" rx="16" fill="#0f4652" stroke="#7ad3e2" strokeOpacity="0.35" />
                <rect x="28" y="38" width="215" height="16" rx="8" fill="#8ddbe8" fillOpacity="0.3" />
                <rect x="28" y="70" width="176" height="12" rx="6" fill="#d5f4f8" fillOpacity="0.4" />
                <rect x="28" y="94" width="160" height="12" rx="6" fill="#d5f4f8" fillOpacity="0.25" />
                <rect x="28" y="118" width="132" height="12" rx="6" fill="#d5f4f8" fillOpacity="0.25" />
                <rect x="28" y="144" width="95" height="24" rx="12" fill="#57c5d8" />

                <circle cx="320" cy="86" r="24" fill="#c8f1f7" />
                <rect x="299" y="112" width="42" height="62" rx="16" fill="#9adce8" />
                <rect x="278" y="124" width="25" height="12" rx="6" fill="#9adce8" />
                <rect x="338" y="126" width="42" height="12" rx="6" fill="#9adce8" />
                <path d="M380 132 L404 120 L403 130 L412 130 L412 136 L403 136 L404 146 Z" fill="#d5f4f8" />
                <circle cx="312" cy="84" r="3" fill="#0a2f38" />
                <circle cx="328" cy="84" r="3" fill="#0a2f38" />
                <path d="M312 94 Q320 100 328 94" stroke="#0a2f38" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="mt-auto space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#0d3b45]/70 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wider text-[#9fdce7]">Quick tip</p>
              <p className="mt-2 text-sm text-[#d7f1f5]">Select your role first, then sign up.</p>
            </div>
          </div>
        </aside>

        <div className="p-6 sm:p-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1F7A8C] to-[#BFE9F0] shadow-lg lg:hidden">
                <Droplets size={28} className="text-white" />
              </div>
              <div className="mb-4 hidden justify-end lg:flex">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-sm">
                  <svg viewBox="0 0 130 70" className="h-14 w-24">
                    <circle cx="30" cy="18" r="10" fill="#c8f1f7" />
                    <rect x="22" y="28" width="18" height="24" rx="8" fill="#9adce8" />
                    <path d="M40 35 L68 35" stroke="#d5f4f8" strokeWidth="5" strokeLinecap="round" />
                    <path d="M67 35 L59 29 M67 35 L59 41" stroke="#d5f4f8" strokeWidth="4" strokeLinecap="round" />
                    <rect x="74" y="22" width="40" height="28" rx="8" fill="#0f4652" stroke="#7ad3e2" strokeOpacity="0.45" />
                    <rect x="80" y="30" width="28" height="6" rx="3" fill="#8ddbe8" fillOpacity="0.55" />
                  </svg>
                </div>
              </div>
              <h2 className="mb-2 text-3xl font-bold text-white">Sign in</h2>
              <p className="text-sm text-[#d7f1f5]">Access your AquaSure dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Email Address</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9dd8e3]" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@aquasure.com"
                    className="w-full rounded-xl border border-white/25 bg-white/15 py-3 pl-10 pr-4 text-white placeholder:text-white/60 outline-none transition focus:border-[#BFE9F0] focus:ring-2 focus:ring-[#BFE9F0]/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9dd8e3]" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-white/25 bg-white/15 py-3 pl-10 pr-12 text-white placeholder:text-white/60 outline-none transition focus:border-[#BFE9F0] focus:ring-2 focus:ring-[#BFE9F0]/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b9e8ef] transition hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Role</label>
                <div className="relative">
                  <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9dd8e3]" size={18} />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-white/25 bg-white/15 py-3 pl-10 pr-4 text-white outline-none transition focus:border-[#BFE9F0] focus:ring-2 focus:ring-[#BFE9F0]/40"
                    required
                  >
                    <option value="officer" className="bg-[#0A2A2F] text-white">Environmental Officer</option>
                    <option value="operator" className="bg-[#0A2A2F] text-white">Industry Operator</option>
                    <option value="technician" className="bg-[#0A2A2F] text-white">Technician</option>
                    <option value="researcher" className="bg-[#0A2A2F] text-white">Researcher</option>
                    <option value="admin" className="bg-[#0A2A2F] text-white">Administrator</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-white/90">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#1F7A8C]"
                  />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#1F7A8C] to-[#8ddbe8] py-3 font-semibold text-white shadow-lg transition hover:brightness-110"
              >
                Sign In
              </button>

              <div className="text-center">
                <p className="text-sm text-white/80">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="font-semibold text-[#d5f4f8] transition hover:text-white"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
