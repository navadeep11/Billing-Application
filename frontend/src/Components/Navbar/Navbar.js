import React, { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box, useMediaQuery } from "@mui/material";
import { Home, PlusSquare, BarChart, ShoppingCart, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavbarLogic } from "./NavbarLogic";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, handleLogout } = useNavbarLogic();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { to: "/", label: "Home", icon: <Home size={24} /> },
    { to: "/add-items", label: "Add Items", icon: <PlusSquare size={24} /> },
    { to: "/analytics", label: "Analytics", icon: <BarChart size={24} /> },
    { to: "/cart", label: "Cart", icon: <ShoppingCart size={24} /> },
  ];

  return (
    <AppBar position="sticky" id="navbar">
      <Toolbar className="toolbar">
        {isMobile && (
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} className="menu-button">
            <Menu size={24} />
          </IconButton>
        )}

        <Typography variant="h6" className="logo">
          <BarChart size={24} />
          InvoLytix
        </Typography>

        {!isMobile && (
          <Box className="nav-links">
            {menuItems.map(({ to, label, icon }) => (
              <Link to={to} key={label} className="nav-btn">
                <IconButton color="inherit">{icon}</IconButton>
                {label}
              </Link>
            ))}
          </Box>
        )}

        <Box className="auth-buttons">
          
            <Button color="inherit" onClick={handleLogout} startIcon={<LogOut size={20} />}>
              Logout
            </Button>
          
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List className="mobile-menu">
          {menuItems.map(({ to, label, icon }) => (
            <ListItem button key={label} component={Link} to={to} onClick={handleDrawerToggle}>
              {icon}
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
