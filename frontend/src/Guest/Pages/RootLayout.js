import React, { useState, useEffect } from "react";
import AppSidebar from "./AppSidebar"; // Ensure the sidebar is guest-centric
import { Outlet } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 260;

const RootLayout = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(isLargeScreen);
  const [anchorEl, setAnchorEl] = useState(null);
  const username = "Guest"; // Replace this with dynamic guest data

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsSidebarOpen(isLargeScreen);
  }, [isLargeScreen]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box>
      <CssBaseline />

      <AppSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        drawerWidth={drawerWidth}
        role="guest" // Customize sidebar for guest features
      />

      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#1E293B",
          boxShadow: theme.shadows[2],
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Welcome, {username}
          </Typography>

          <IconButton onClick={handleMenuOpen}>
            <Avatar alt={username} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          ml: isSidebarOpen ? `${drawerWidth}px` : 0,
          transition: "margin 0.3s ease",
          px: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default RootLayout;
