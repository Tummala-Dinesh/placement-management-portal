import { createContext, useContext, useState, useEffect } from "react";

 
const AuthContext = createContext(null);
 
export function AuthProvider({ children }) {
  const [user,      setUser]      = useState(null);
  const [token,     setToken]     = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const savedToken = localStorage.getItem("placeme_token");
    const savedUser  = localStorage.getItem("placeme_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("placeme_token", jwtToken);
    localStorage.setItem("placeme_user",  JSON.stringify(userData));
  };
 
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("placeme_token");
    localStorage.removeItem("placeme_user");
  };
 
  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token,
    isAdmin:         user?.role === "admin",
    isStudent:       user?.role === "student",
  };
 
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}