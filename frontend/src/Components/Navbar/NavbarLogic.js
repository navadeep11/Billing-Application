import { useState } from "react";

export const useNavbarLogic = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log("User logged out");
  };

  return { isAuthenticated, handleLogout };
};
