import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";

const ServiceRequest = () => {
  const [request, setRequest] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [success, setSuccess] = useState(false);

  const availableServices = [
    { name: "Laundry", price: 15 },
    { name: "Room Cleaning", price: 20 },
    { name: "Food Delivery", price: 30 },
    { name: "Spa", price: 50 },
    { name: "Transportation", price: 40 },
  ];

  // Handle checkbox change for services
  const handleServiceChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedServices((prev) => [...prev, name]);
    } else {
      setSelectedServices((prev) => prev.filter((service) => service !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request data
    const serviceRequestData = {
      roomNumber,
      selectedServices,
      request,
      specialInstructions,
    };

    try {
      await axios.post("/api/guest/service-requests", serviceRequestData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setSuccess(true);
      setRoomNumber("");
      setRequest("");
      setSelectedServices([]);
      setSpecialInstructions("");
    } catch (error) {
      console.error("Error submitting service request:", error);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Request a Service
      </Typography>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Service request submitted successfully!
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        {/* Room Number */}
        <TextField
          label="Room Number"
          fullWidth
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        {/* Service Selection */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Services You Need:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {availableServices.map((service) => (
            <FormControlLabel
              key={service.name}
              control={
                <Checkbox
                  name={service.name}
                  onChange={handleServiceChange}
                  checked={selectedServices.includes(service.name)}
                />
              }
              label={`${service.name} ($${service.price})`}
            />
          ))}
        </Box>

        {/* Request Description */}
        <TextField
          label="Enter Your Request (Optional)"
          fullWidth
          multiline
          rows={4}
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Special Instructions */}
        <TextField
          label="Special Instructions (Optional)"
          fullWidth
          multiline
          rows={4}
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Request
        </Button>
      </form>
    </Paper>
  );
};

export default ServiceRequest;
