import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "../pages/Header";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const { userName } = useAuth();

  return (
    <div className="flex h-screen bg-[#F4FBFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onNotificationClick={() => {}} 
          notificationCount={0}
          userName={userName}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
