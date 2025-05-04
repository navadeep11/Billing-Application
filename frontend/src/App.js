import React, {createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Authentication/Js/SignUp";
import SignIn from "./Components/Authentication/Js/SignIn";
import Otp from "./Components/Authentication/Js/Otp";
import Home from "./Pages/Home";
import AddItems from "./Pages/AddItems";
import Analytics from "./Pages/Analytics";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import { useGetUserQuery, useLogoutMutation } from "./App/Services/AuthenticationApi";
import Items from "./Pages/Items";

export const AuthContext = createContext();
const App = () => {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: user, isLoading ,refetch} = useGetUserQuery();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (isLoading) return; // Wait until user data loads

    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user, isLoading]);


  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated,refetch,handleLogout }}>
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/otp/:email" element={<Otp />} />



        {/* 🔒 Protected Routes */}
        <Route
          path="/add-items"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<AddItems />} />}
        />
        <Route
          path="/items"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Items/>} />}
        />
        <Route
          path="/analytics"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Analytics />} />}
        />
        <Route
          path="/cart"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Cart />} />}
        />
      </Routes>
    </Router>
    </AuthContext.Provider>
  );
};

export default App;
