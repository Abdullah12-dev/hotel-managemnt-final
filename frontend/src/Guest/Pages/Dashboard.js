import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom


const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate between pages

  useEffect(() => {
    // Simulating a delay for loading content
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Handle navigation to the Room Management page
  const handleBookingRedirect = () => {
    navigate("/guestdashboard/room-management"); // Redirect to the room-management route under /dashboard
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section */}
      <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          Welcome to Hotel One
        </Typography>
        <Typography variant="h5" sx={{ color: "gray", marginTop: "1rem" }}>
          Experience luxury, comfort, and impeccable service.
        </Typography>
      </Box>



      {/* Hotel Introduction Section */}
      <Box sx={{ marginTop: "2rem", textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Discover Comfort Like Never Before
        </Typography>
        <Typography variant="h6" sx={{ color: "gray", marginTop: "1rem" }}>
          At Hotel One, we offer a seamless experience with luxurious rooms,
          top-notch amenities, and personalized service. Book your stay with us
          today and indulge in an unforgettable getaway.
        </Typography>
      </Box>

      {/* Reservation Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3rem",
          flexDirection: "column",
        }}
      >
        <Paper
          sx={{
            padding: "20px",
            boxShadow: 3,
            backgroundColor: "#0088FE",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            Ready for an unforgettable stay? Click below to make a reservation
            now.
          </Typography>
          <Button
            sx={{
              marginTop: "1rem",
              backgroundColor: "#fff",
              color: "#0088FE",
              "&:hover": { backgroundColor: "#fff" },
            }}
            onClick={handleBookingRedirect} // On click, it redirects to RoomManagement
          >
            Book Now
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
