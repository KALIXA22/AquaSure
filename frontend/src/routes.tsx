import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LoginView } from "./components/LoginView";
import { RegisterView } from "./components/RegisterView";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardView } from "./pages/MainDashboard";
import { WaterQualityView } from "./pages/WaterQualityView";
import { SensorsView } from "./pages/SensorsView";
import { AnalyticsView } from "./pages/AnalyticsView";
import { AlertsView } from "./pages/AlertsView";
import { SettingsView } from "./pages/SettingsView";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/signup",
    element: <RegisterView />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardView /> },
      { path: "water-quality", element: <WaterQualityView /> },
      { path: "sensors", element: <SensorsView /> },
      { path: "analytics", element: <AnalyticsView /> },
      { path: "alerts", element: <AlertsView /> },
      { path: "settings", element: <SettingsView /> },
    ],
  },
]);
