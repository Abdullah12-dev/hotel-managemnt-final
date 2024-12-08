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
import GroupIcon from "@mui/icons-material/Group";
import HotelIcon from "@mui/icons-material/Hotel";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import CloudIcon from "@mui/icons-material/Cloud";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const AppSidebar = ({ isSidebarOpen, toggleSidebar, drawerWidth = 240 }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = React.useState({ dashboard: false, settings: false });

  const handleToggle = (menu) => {
    setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };


  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    {
      text: "Guest Management",
      icon: <GroupIcon />, // Represents a group of people (guests)
      path: "/receptionistdashboard/guest-management",
    },
    {
      text: "Room Management",
      icon: <HotelIcon />, // Represents a bed (rooms in a hotel)
      path: "/receptionistdashboard/rooms-management",
    },
    {
      text: "Check In",
      icon: <LoginIcon />, // Represents an entry or login
      path: "/receptionistdashboard/checkIN",
    },
    {
      text: "Check Out",
      icon: <LogoutIcon />, // Represents an exit or logout
      path: "/receptionistdashboard/checkout",
    },
    {
      text: "Booking Management",
      icon: <EventNoteIcon />, // Represents event/booking management
      path: "/receptionistdashboard/booking-management",
    },
    {
      text: "Services Request",
      icon: <RoomServiceIcon />, // Represents service (room service)
      path: "/receptionistdashboard/ServiceRequest-management",
    },
    {
      text: "Weather Conditions",
      icon: <CloudIcon />, // Represents weather or clouds
      path: "/receptionistdashboard/weatherDashboard",
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
        display: { xs: "block", sm: "block" },
      }}
      ModalProps={{
        keepMounted: true,
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
            width: "8px", // Width of the scrollbar
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#2c2f34", // Track color
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#50597b", // Thumb color
            borderRadius: "4px", // Rounded edges
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#3f51b5", // Thumb hover color
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
                    <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {openMenu[item.text.toLowerCase()] ? <ExpandLess /> : <ExpandMore />}
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
                  onClick={() => {
                    item.action ? item.action() : navigate(item.path);
                  }}
                  sx={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#3f51b5" },
                  }}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
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