
import { createContext, useState, useContext, ReactNode } from "react";

export type UserRole = "admin" | "officer" | "operator" | "technician" | "researcher";


interface AuthContextType {
  isAuthenticated: boolean;
  userName: string;
  userRole: UserRole | null;
  login: (email: string, password: string, role: UserRole) => void;
  register: (fullName: string, email: string, password: string, organization: string, role: UserRole) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState<UserRole | null>(null);


  const login = (email: string, password: string, role: UserRole) => {
    if (email && password && role) {
      const name = email.split("@")[0];
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
      setUserRole(role);
      setIsAuthenticated(true);
      console.log(`Logged in as: ${role}`);
    }
  };

  const register = (fullName: string, email: string, password: string, organization: string, role: UserRole) => {
    if (fullName && email && password && role) {
      setUserName(fullName);
      setUserRole(role);
      setIsAuthenticated(true);
      console.log(`Registered as: ${role}`);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName("");
    setUserRole(null);
    console.log("Logged out");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, userRole, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}