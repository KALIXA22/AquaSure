import { useState } from "react";
import { LoginView, UserRole } from "./components/LoginView";
import { RegisterView} from "./components/RegisterView";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./pages/Header";
import { DashboardView } from "./pages/MainDashboard";
import { WaterQualityView } from "./pages/WaterQualityView";
import { SensorsView } from "./pages/SensorsView";
import { AnalyticsView } from "./pages/AnalyticsView";
import { AlertsView } from "./pages/AlertsView";
import { SettingsView } from "./pages/SettingsView";
import { OfficerDashboard } from "./pages/OfficerDashboard";
import { OperatorDashboard } from "./pages/OperatorDashboard";
import { TechnicianDashboard } from "./pages/TechnicianDashboard";
import { ResearcherDashboard } from "./pages/ResearcherDashboard";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  const [userName, setUserName] = useState("Admin");
  const [userRole, setUserRole] = useState<UserRole>("admin");
  const [activeView, setActiveView] = useState("dashboard");
  const [notificationCount, setNotificationCount] = useState(3);

  const handleLogin = (email: string, password: string, role?: UserRole) => {
    // Demo authentication - accepts any credentials
    if (email && password) {
      const name = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
      setUserName(name);
      setUserRole(role || "admin");
      setIsAuthenticated(true);
    }
  };

  const handleSignup = (data: { name: string; email: string; password: string; organization: string; role: UserRole }) => {
    // Demo signup - automatically logs in
    setUserName(data.name);
    setUserRole(data.role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("Admin");
    setUserRole("admin");
    setActiveView("dashboard");
    setAuthView("login");
  };

  const handleNotificationClick = () => {
    setActiveView("alerts");
    setNotificationCount(0);
  };

  const renderView = () => {
    // Role-specific dashboards
    if (activeView === "dashboard") {
      switch (userRole) {
        case "officer":
          return <OfficerDashboard />;
        case "operator":
          return <OperatorDashboard />;
        case "technician":
          return <TechnicianDashboard />;
        case "researcher":
          return <ResearcherDashboard />;
        case "admin":
          return <DashboardView />;
        default:
          return <DashboardView />;
      }
    }

    // Admin has access to all views
    if (userRole === "admin") {
      switch (activeView) {
        case "water-quality":
          return <WaterQualityView />;
        case "sensors":
          return <SensorsView />;
        case "analytics":
          return <AnalyticsView />;
        case "alerts":
          return <AlertsView />;
        case "settings":
          return <SettingsView />;
        default:
          return <DashboardView />;
      }
    }

    // Other roles: redirect to dashboard if they try to access restricted views
    switch (userRole) {
      case "officer":
        return <OfficerDashboard />;
      case "operator":
        return <OperatorDashboard />;
      case "technician":
        return <TechnicianDashboard />;
      case "researcher":
        return <ResearcherDashboard />;
      default:
        return <DashboardView />;
    }
  };

  // Show authentication views if not authenticated
  if (!isAuthenticated) {
    if (authView === "login") {
      return (
        <LoginView
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthView("signup")}
        />
      );
    } else {
      return (
        <RegisterView
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthView("login")}
        />
      );
    }
  }

  // Main dashboard view
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F4FBFC] to-[#E0F7FA]">
      {/* Sidebar */}
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        onLogout={handleLogout}
        userName={userName}
        userRole={userRole}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          onNotificationClick={handleNotificationClick}
          notificationCount={notificationCount}
          userName={userName}
          userRole={userRole}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;