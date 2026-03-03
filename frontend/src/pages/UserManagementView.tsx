import { UserPlus, Phone, Mail, Building, MapPin, Key, Send, Shield } from "lucide-react";
import { useState } from "react";
import { UserRole } from "../components/LoginView"

export function UserManagementView() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "operator" as Exclude<UserRole, "admin">,
    organization: "",
    monitoringStation: "",
    temporaryPassword: "",
    sendSMS: false,
  });

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@industry.rw", role: "operator", station: "Station B", status: "active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@nema.gov.rw", role: "officer", station: "All Stations", status: "active" },
    { id: 3, name: "Mike Chen", email: "mike@tech.rw", role: "technician", station: "Station C", status: "active" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.organization || !formData.monitoringStation || !formData.temporaryPassword) {
      alert("Please fill in all required fields");
      return;
    }

    // Create user
    const newUser = {
      id: users.length + 1,
      name: formData.fullName,
      email: formData.email,
      role: formData.role,
      station: formData.monitoringStation,
      status: "active",
    };

    setUsers([...users, newUser]);

    // Show success message
    if (formData.sendSMS) {
      alert(`User created successfully!\nCredentials sent via SMS to ${formData.phone}`);
    } else {
      alert(`User created successfully!\nTemporary Password: ${formData.temporaryPassword}\nPlease share this password securely with the user.`);
    }

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      role: "operator",
      organization: "",
      monitoringStation: "",
      temporaryPassword: "",
      sendSMS: false,
    });
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, temporaryPassword: password });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2A2F]">User Management</h1>
          <p className="text-sm text-gray-600 mt-1">Create and manage system users</p>
        </div>
        <div className="backdrop-blur-xl bg-red-50/70 border border-red-200/40 rounded-xl px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-red-600" />
            <span className="text-sm font-medium text-red-700">Admin Only</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create User Form */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <UserPlus size={20} className="text-[#1F7A8C]" />
              <h2 className="text-lg font-semibold text-[#0A2A2F]">Create New User</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Information */}
              <div className="backdrop-blur-sm bg-[#BFE9F0]/30 border border-[#1F7A8C]/20 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-[#0A2A2F] mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-xl text-[#0A2A2F] placeholder-gray-400 focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/30 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Mail size={16} />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john.doe@organization.rw"
                      className="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-xl text-[#0A2A2F] placeholder-gray-400 focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/30 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Phone size={16} />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+250 XXX XXX XXX"
                      className="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-xl text-[#0A2A2F] placeholder-gray-400 focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/30 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Building size={16} />
                      Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Water Treatment Plant"
                      className="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-xl text-[#0A2A2F] placeholder-gray-400 focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/30 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Role & Assignment */}
              <div className="backdrop-blur-sm bg-[#BFE9F0]/30 border border-[#1F7A8C]/20 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-[#0A2A2F] mb-4">Role & Assignment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as Exclude<UserRole, "admin"> })}
                      className="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-xl text-[#0A2A2F] focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/30 transition-all"
                      required
                    >
                      <option value="officer">Environmental Officer</option>
                      <option value="operator">Industry Operator</option>
                      <option value="technician">Technician</option>
                      <option value="researcher">Researcher</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin size={16} />
                      Monitoring Station <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.monitoringStation}
                      onChange={(e) => setFormData({ ...formData, monitoringStation: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/60 border border-white/40 rounded-xl text-[#0A2A2F] focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/30 transition-all"
                      required
                    >
                      <option value="">Select Station</option>
                      <option value="All Stations">All Stations (Officers Only)</option>
                      <option value="Station A">Station A - Industrial Zone</option>
                      <option value="Station B">Station B - Residential Area</option>
                      <option value="Station C">Station C - Agricultural Zone</option>
                      <option value="Station D">Station D - River Outlet</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="backdrop-blur-sm bg-[#BFE9F0]/30 border border-[#1F7A8C]/20 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-[#0A2A2F] mb-4">Security Credentials</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Key size={16} />
                      Temporary Password <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.temporaryPassword}
                        onChange={(e) => setFormData({ ...formData, temporaryPassword: e.target.value })}
                        placeholder="Enter or generate password"
                        className="flex-1 px-4 py-2.5 bg-white/60 border border-white/40 rounded-xl text-[#0A2A2F] placeholder-gray-400 focus:outline-none focus:border-[#1F7A8C] focus:ring-2 focus:ring-[#1F7A8C]/30 transition-all font-mono"
                        required
                      />
                      <button
                        type="button"
                        onClick={generatePassword}
                        className="px-4 py-2.5 bg-gradient-to-r from-[#1F7A8C] to-[#BFE9F0] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 font-semibold"
                      >
                        Generate
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">User will be required to change password on first login</p>
                  </div>

                  <div className="flex items-start gap-3 bg-white/50 rounded-lg p-3">
                    <input
                      type="checkbox"
                      id="sendSMS"
                      checked={formData.sendSMS}
                      onChange={(e) => setFormData({ ...formData, sendSMS: e.target.checked })}
                      className="w-4 h-4 mt-1 rounded accent-[#1F7A8C]"
                    />
                    <label htmlFor="sendSMS" className="text-sm text-gray-700 flex items-center gap-2">
                      <Send size={14} />
                      Send credentials via SMS to user's phone number
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#1F7A8C] to-[#2ECC71] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <UserPlus size={20} />
                  Create User Account
                </button>
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-6 backdrop-blur-sm bg-red-50/50 border border-red-200/40 rounded-xl p-4">
              <p className="text-xs text-red-800 font-medium">
                ⚠️ Authorized personnel only. All user creation activities are logged and monitored. Ensure proper authorization before creating accounts.
              </p>
            </div>
          </div>
        </div>

        {/* Active Users List */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-semibold text-[#0A2A2F] mb-4">Active Users</h2>
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-xl p-3 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-[#0A2A2F] text-sm">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        user.status === "active" ? "bg-green-100 text-[#2ECC71]" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{user.role}</span>
                    <span className="text-[#1F7A8C] font-medium">{user.station}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
