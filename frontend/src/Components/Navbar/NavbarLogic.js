import { useEffect, useState } from "react";
import { useGetUserQuery, useLogoutMutation } from "../../App/Services/AuthenticationApi";

export const useNavbarLogic = () => {
  const { data: user, isLoading, isError } = useGetUserQuery();
  const [logout] = useLogoutMutation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError && user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user, isLoading, isError]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setIsAuthenticated(false);
      window.location.reload(); // Refresh to update auth status
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return { isAuthenticated, handleLogout, isLoading };
};
