import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Authentication/Js/SignUp"
import SignIn from "./Components/Authentication/Js/SignIn"
import Home from "./Pages/Home";
import AddItems from "./Pages/AddItems";
import Analytics from "./Pages/Analytics";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-items" element={<AddItems />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
      </Routes>
    </Router>
  );
};

export default App;
