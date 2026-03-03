import { Droplets, Mail, Lock, User, Building, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { UserRole } from "./LoginView";

interface SignupViewProps {
  onSignup: (data: { name: string; email: string; password: string; organization: string; role: UserRole }) => void;
  onSwitchToLogin: () => void;
}

export function RegisterView({ onSignup, onSwitchToLogin }: SignupViewProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
    role: "operator" as UserRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    onSignup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      organization: formData.organization,
      role: formData.role,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062229] via-[#0b3b46] to-[#1F7A8C] px-4 py-8 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-lg lg:grid-cols-2">
        <aside className="relative hidden flex-col overflow-hidden bg-gradient-to-br from-[#03191f] to-[#0a2f38] p-10 text-white lg:flex">
          <div className="pointer-events-none absolute -right-14 -top-10 h-40 w-40 rounded-full bg-[#8fe1ef]/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-[#1F7A8C]/35 blur-3xl" />
          <div className="pointer-events-none absolute right-12 top-24 h-2 w-2 animate-pulse rounded-full bg-[#bdebf2]" />
          <div className="pointer-events-none absolute right-24 top-[8.5rem] h-3 w-3 animate-pulse rounded-full bg-[#9dd8e3] [animation-delay:300ms]" />
          <div className="pointer-events-none absolute right-16 top-[11.5rem] h-2 w-2 animate-pulse rounded-full bg-[#d5f4f8] [animation-delay:700ms]" />

          <div>
            <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1F7A8C] to-[#BFE9F0] shadow-lg">
              <Droplets size={30} />
            </div>
            <h1 className="mb-2 text-4xl font-bold leading-tight">AquaSure</h1>
            <p className="text-sm text-[#cdeff4]">Create your account</p>
          </div>

          <div className="my-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0d3b45]/75 p-5 backdrop-blur-sm">
            <svg viewBox="0 0 430 250" className="h-56 w-full">
              <rect x="18" y="30" width="230" height="170" rx="16" fill="#0f4652" stroke="#7ad3e2" strokeOpacity="0.35" />
              <rect x="36" y="50" width="150" height="12" rx="6" fill="#8ddbe8" fillOpacity="0.45" />
              <rect x="36" y="76" width="190" height="10" rx="5" fill="#d5f4f8" fillOpacity="0.25" />
              <rect x="36" y="96" width="172" height="10" rx="5" fill="#d5f4f8" fillOpacity="0.25" />
              <rect x="36" y="116" width="140" height="10" rx="5" fill="#d5f4f8" fillOpacity="0.25" />
              <rect x="36" y="144" width="95" height="24" rx="12" fill="#57c5d8" />

              <circle cx="315" cy="82" r="24" fill="#c8f1f7" />
              <rect x="294" y="108" width="42" height="63" rx="15" fill="#9adce8" />
              <rect x="333" y="120" width="42" height="11" rx="5" fill="#9adce8" />
              <rect x="277" y="120" width="18" height="11" rx="5" fill="#9adce8" />
              <path d="M375 124 L398 112 L397 121 L408 121 L408 127 L397 127 L398 136 Z" fill="#d5f4f8" />
              <circle cx="307" cy="80" r="3" fill="#0a2f38" />
              <circle cx="323" cy="80" r="3" fill="#0a2f38" />
              <path d="M307 90 Q315 96 323 90" stroke="#0a2f38" strokeWidth="3" fill="none" strokeLinecap="round" />

              <circle cx="272" cy="182" r="12" fill="#57c5d8" className="animate-pulse" />
              <circle cx="304" cy="198" r="8" fill="#8ddbe8" className="animate-pulse [animation-delay:280ms]" />
              <circle cx="330" cy="182" r="10" fill="#c8f1f7" className="animate-pulse [animation-delay:520ms]" />
            </svg>
          </div>

            <div className="mt-auto space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#0d3b45]/70 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wider text-[#9fdce7]">Quick tip</p>
              <p className="mt-2 text-sm text-[#d7f1f5]">Select your role first, then sign in.</p>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-3 gap-3 pt-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
              <div className="mx-auto h-2 w-2 animate-ping rounded-full bg-[#7ad3e2]" />
              <p className="mt-2 text-xs text-[#d7f1f5]">Fast</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
              <div className="mx-auto h-2 w-2 animate-ping rounded-full bg-[#7ad3e2]" />
              <p className="mt-2 text-xs text-[#d7f1f5]">Smart</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
              <div className="mx-auto h-2 w-2 animate-ping rounded-full bg-[#7ad3e2]" />
              <p className="mt-2 text-xs text-[#d7f1f5]">Secure</p>
            </div>
          
          </div>
        </aside>

        <div className="relative overflow-hidden p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-24 top-8 h-40 w-40 rounded-full bg-[#8ddbe8]/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-14 bottom-8 h-32 w-32 rounded-full bg-[#57c5d8]/15 blur-2xl" />
          <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
            <div className="mb-8 text-center lg:text-left">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1F7A8C] to-[#BFE9F0] shadow-lg lg:hidden">
                <Droplets size={28} className="text-white" />
              </div>
              <h2 className="mb-2 text-3xl font-bold text-white">Create Account</h2>
            
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Full Name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9dd8e3]" size={18} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/25 bg-white/15 py-3 pl-10 pr-4 text-white placeholder:text-white/60 outline-none transition focus:border-[#BFE9F0] focus:ring-2 focus:ring-[#BFE9F0]/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Email Address</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9dd8e3]" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@organization.com"
                    className="w-full rounded-xl border border-white/25 bg-white/15 py-3 pl-10 pr-4 text-white placeholder:text-white/60 outline-none transition focus:border-[#BFE9F0] focus:ring-2 focus:ring-[#BFE9F0]/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Organization</label>
                <div className="relative">
                  <Building className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9dd8e3]" size={18} />
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Water Treatment Facility"
                    className="w-full rounded-xl border border-white/25 bg-white/15 py-3 pl-10 pr-4 text-white placeholder:text-white/60 outline-none transition focus:border-[#BFE9F0] focus:ring-2 focus:ring-[#BFE9F0]/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Role</label>
                <div className="relative">
                  <ShieldCheck className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9dd8e3]" size={18} />
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
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

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9dd8e3]" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create password"
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
                <label className="mb-2 block text-sm font-medium text-white">Confirm Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9dd8e3]" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repeat password"
                    className="w-full rounded-xl border border-white/25 bg-white/15 py-3 pl-10 pr-12 text-white placeholder:text-white/60 outline-none transition focus:border-[#BFE9F0] focus:ring-2 focus:ring-[#BFE9F0]/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b9e8ef] transition hover:text-white"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded accent-[#1F7A8C]"
                />
                <label htmlFor="terms" className="text-sm text-white/85">
                  I agree to the{" "}
                  <button type="button" className="font-medium text-[#d5f4f8] transition hover:text-white">
                    Terms
                  </button>{" "}
                  and{" "}
                  <button type="button" className="font-medium text-[#d5f4f8] transition hover:text-white">
                    Privacy Policy
                  </button>
                  .
                </label>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#1F7A8C] to-[#8ddbe8] py-3 font-semibold text-white shadow-lg transition hover:brightness-110"
                >
                  Create Account
                </button>
                <p className="text-center text-sm text-white/80">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="font-semibold text-[#d5f4f8] transition hover:text-white"
                  >
                    Sign in
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
