import React, { useContext, useState } from "react";
import {AppBar,Toolbar,Button,IconButton,Typography,Drawer,List, ListItem,ListItemText,Box,useMediaQuery,Divider} from "@mui/material";
import { Home, PlusSquare, BarChart, ShoppingCart, LogOut, LogIn, UserPlus, Menu, Package } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../App";

const Navbar = () => {
  const {handleLogout,isAuthenticated} =useContext(AuthContext)
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { to: "/", label: "Home", icon: <Home size={24} /> },
    { to: "/add-items", label: "Add Items", icon: <PlusSquare size={24} /> },
    { to: "/items", label: "Items", icon: <Package size={24} /> },
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

        {!isMobile && (
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
        )}
      </Toolbar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List className="mobile-menu">
          {isAuthenticated ? (
            <>
              {menuItems.map(({ to, label, icon }) => (
                <ListItem button key={label} component={Link} to={to} onClick={handleDrawerToggle}>
                  <IconButton>{icon}</IconButton>
                  <ListItemText primary={label} />
                </ListItem>
              ))}
              <Divider />
              <ListItem button onClick={handleLogout} className="logout-btn">
                <IconButton>
                  <LogOut size={24} />
                </IconButton>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/signin" onClick={handleDrawerToggle}>
                <IconButton>
                  <LogIn size={24} />
                </IconButton>
                <ListItemText primary="Sign In" />
              </ListItem>
              <ListItem button component={Link} to="/signup" onClick={handleDrawerToggle}>
                <IconButton>
                  <UserPlus size={24} />
                </IconButton>
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
