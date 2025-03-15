import { Navigate, Outlet } from "react-router-dom";
import { useNavbarLogic } from "./Components/Navbar/NavbarLogic"; // Import our custom hook

const ProtectedRoute = () => {
  const { user, isLoading } = useNavbarLogic(); // Use from navbar logic

  if (isLoading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
