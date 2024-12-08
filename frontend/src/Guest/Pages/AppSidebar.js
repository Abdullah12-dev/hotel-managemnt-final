import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FeedbackIcon from "@mui/icons-material/Feedback"; // Import Feedback Icon
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const AppSidebar = ({ isSidebarOpen, toggleSidebar, drawerWidth = 240 }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = React.useState({});

  const handleToggle = (menu) => {
    setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/guestdashboard" },

    {
      text: "Room Management",
      icon: <DashboardIcon />,
      path: "/guestdashboard/room-management",
    },
    {
      text: "Service Management",
      icon: <DashboardIcon />,
      path: "/guestdashboard/service-management",
    },
    {
      text: "Booking History",
      icon: <DashboardIcon />,
      path: "/guestdashboard/booking-history",
    },

    {
      text: "Weather Conditions",
      icon: <DashboardIcon />,
      path: "/guestdashboard/weather-dashboard",
    },
    {
      text: "Feedback", // Add the Feedback menu item
      icon: <FeedbackIcon />,
      path: "/guestdashboard/feedback", // Add the corresponding route for feedback
    },
    {
      text: "Contact Us",
      icon: <FeedbackIcon />,
      path: "/guestdashboard/contact-us", // Add the route for Contact Us
    },

  ];

  return (
    <Drawer
      variant={isSidebarOpen ? "persistent" : "temporary"}
      open={isSidebarOpen}
      onClose={toggleSidebar}
      sx={{
        width: isSidebarOpen ? drawerWidth : 0,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#282c34",
          color: "#fff",
        },
      }}
      ModalProps={{
        keepMounted: true, // Helps with performance on mobile devices
      }}
    >
      <Toolbar>
        <IconButton
          onClick={toggleSidebar}
          sx={{ display: { sm: "none" }, color: "#fff" }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ ml: 2 }}>
          Hotel Manager
        </Typography>
      </Toolbar>
      <Box
        sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#2c2f34",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#50597b",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#3f51b5",
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.children ? (
                <>
                  <ListItem
                    onClick={() => handleToggle(item.text.toLowerCase())}
                    sx={{
                      padding: "10px 20px",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#3f51b5" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#fff" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                    {openMenu[item.text.toLowerCase()] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    in={openMenu[item.text.toLowerCase()]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((subItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          onClick={() => navigate(subItem.path)}
                          sx={{
                            pl: 4,
                            padding: "8px 20px",
                            cursor: "pointer",
                            "&:hover": { backgroundColor: "#50597b" },
                          }}
                        >
                          <ListItemText primary={subItem.text} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem
                  onClick={() => navigate(item.path)}
                  sx={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#3f51b5" },
                  }}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppSidebar;
