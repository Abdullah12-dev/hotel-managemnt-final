import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import BookingForm from "../components/BookingForm"; // Import the BookingForm component

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);

  useEffect(() => {
    // Simulating fetching rooms data
    const fetchRooms = async () => {
      setLoading(true);
      setTimeout(() => {
        // Dummy data for rooms
        const dummyRooms = [
          {
            _id: "1",
            name: "Deluxe Suite",
            type: "Suite",
            capacity: 2,
            price: 200,
            image:
              "https://images.unsplash.com/photo-1660731513683-4cb0c9ac09b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            _id: "2",
            name: "Standard Room",
            type: "Single",
            capacity: 1,
            price: 100,
            image:
              "https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            _id: "3",
            name: "Family Room",
            type: "Family",
            capacity: 4,
            price: 150,
            image:
              "https://images.unsplash.com/photo-1515362778563-6a8d0e44bc0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            _id: "4",
            name: "Executive Suite",
            type: "Suite",
            capacity: 2,
            price: 250,
            image:
              "https://images.unsplash.com/photo-1621891333819-00c206ec8994?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            _id: "4",
            name: "Executive Suite",
            type: "Suite",
            capacity: 2,
            price: 250,
            image:
              "https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            _id: "4",
            name: "Executive Suite",
            type: "Suite",
            capacity: 2,
            price: 250,
            image:
              "https://images.unsplash.com/photo-1631049307421-2ee48a375aca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ];

        setRooms(dummyRooms);
        setFilteredRooms(dummyRooms);
        setLoading(false);
      }, 1000); // Simulate loading time
    };

    fetchRooms();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredRooms(
      rooms.filter(
        (room) =>
          room.name.toLowerCase().includes(query) ||
          room.type.toLowerCase().includes(query) ||
          room.capacity.toString().includes(query) ||
          room.price.toString().includes(query)
      )
    );
  };

  const handleBookRoom = (roomId) => {
    const room = rooms.find((room) => room._id === roomId);
    setSelectedRoom(room); // Set selected room for booking
    setOpenBookingDialog(true); // Open booking dialog
  };

  const handleCloseDialog = () => {
    setOpenBookingDialog(false); // Close the dialog when user cancels
    setSelectedRoom(null);
  };

  const handleConfirmBooking = (bookingDetails) => {
    // Handle booking confirmation logic
    console.log("Booking confirmed:", bookingDetails);
    setOpenBookingDialog(false); // Close the dialog after booking
  };

  if (loading) return <Typography variant="h6">Loading rooms...</Typography>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Available Rooms
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search rooms"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />

      {filteredRooms.length === 0 ? (
        <Typography variant="h6">No rooms match your search.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredRooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room._id}>
              <Card variant="outlined" sx={{ boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={room.image}
                  alt={room.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {room.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Type: {room.type}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Capacity: {room.capacity} person(s)
                  </Typography>
                  <Typography variant="h6" component="div" color="primary">
                    ${room.price} per night
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "16px" }}
                    onClick={() => handleBookRoom(room._id)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Booking Dialog */}
      <Dialog open={openBookingDialog} onClose={handleCloseDialog}>
        <DialogTitle>Booking Information</DialogTitle>
        <DialogContent>
          <BookingForm
            room={selectedRoom}
            onConfirmBooking={handleConfirmBooking} // Pass the onConfirmBooking function here
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoomManagement;
