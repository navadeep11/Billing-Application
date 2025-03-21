import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Home, PlusSquare, BarChart, ShoppingCart, LogOut, LogIn, UserPlus, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, handleLogout }) => {
  
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
            {isAuthenticated &&
              menuItems.map(({ to, label, icon }) => (
                <Link to={to} key={label} className="nav-btn">
                  <IconButton color="inherit">{icon}</IconButton>
                  {label}
                </Link>
              ))}
          </Box>
        )}

        <Box className="auth-buttons">
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout} startIcon={<LogOut size={20} />}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signin" startIcon={<LogIn size={20} />}>
                Sign In
              </Button>
              <Button color="inherit" component={Link} to="/signup" startIcon={<UserPlus size={20} />}>
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List className="mobile-menu">
          {isAuthenticated ? (
            menuItems.map(({ to, label, icon }) => (
              <ListItem button key={label} component={Link} to={to} onClick={handleDrawerToggle}>
                {icon}
                <ListItemText primary={label} />
              </ListItem>
            ))
          ) : (
            <>
              <ListItem button component={Link} to="/signin" onClick={handleDrawerToggle}>
                <LogIn size={24} />
                <ListItemText primary="Sign In" />
              </ListItem>
              <ListItem button component={Link} to="/signup" onClick={handleDrawerToggle}>
                <UserPlus size={24} />
                <ListItemText primary="Sign Up" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
