import React from "react";
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

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/otp/:email" element={<Otp />} />

        {/* 🔒 Protected Routes */}
        <Route path="/add-items" element={<ProtectedRoute element={<AddItems />} />} />
        <Route path="/analytics" element={<ProtectedRoute element={<Analytics />} />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
      </Routes>
    </Router>
  );
};

export default App;
