import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const BookingForm = ({ room, onConfirmBooking }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [additionalServices, setAdditionalServices] = useState({
    breakfast: false,
    pool: false,
  });
  const [totalPrice, setTotalPrice] = useState(room.price);
  const [numAdults, setNumAdults] = useState(1); // State for number of adults
  const [numChildren, setNumChildren] = useState(0); // State for number of children

  const navigate = useNavigate();

  // Handle the change of additional services
  const handleServiceChange = (event) => {
    setAdditionalServices({
      ...additionalServices,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDateChange = () => {
    if (startDate && endDate) {
      const days =
        (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24);
      if (days < 0) {
        alert("End date cannot be before start date");
      } else {
        const extraCharges =
          (additionalServices.breakfast ? 10 : 0) +
          (additionalServices.pool ? 20 : 0);
        const pricePerPerson = room.price * (numAdults + numChildren * 0.5); // Children count as half-price
        setTotalPrice(pricePerPerson * days + extraCharges);
      }
    }
  };

  const handleSubmit = () => {
    const bookingDetails = {
      roomId: room._id,
      startDate,
      endDate,
      totalPrice,
      services: additionalServices,
      roomName: room.name, // Add room name for payment details
      numAdults,
      numChildren,
    };

    onConfirmBooking(bookingDetails); // Call the onConfirmBooking function to handle the booking

    // Redirect to the new payment page
    navigate("/dashboard/payment", {
      state: { bookingDetails },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <Typography variant="h5">Book {room.name}</Typography>
        <div style={{ margin: "20px 0" }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
              handleDateChange();
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </div>
        <div style={{ margin: "20px 0" }}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
              handleDateChange();
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </div>
        <div style={{ margin: "20px 0" }}>
          <Typography variant="body1">Additional Services:</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={additionalServices.breakfast}
                onChange={handleServiceChange}
                name="breakfast"
              />
            }
            label="Breakfast ($10)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={additionalServices.pool}
                onChange={handleServiceChange}
                name="pool"
              />
            }
            label="Pool Access ($20)"
          />
        </div>

        <div style={{ margin: "20px 0" }}>
          <TextField
            label="Number of Adults"
            type="number"
            value={numAdults}
            onChange={(e) => {
              setNumAdults(Math.max(1, e.target.value)); // Ensure at least 1 adult
              handleDateChange();
            }}
            fullWidth
          />
        </div>

        <div style={{ margin: "20px 0" }}>
          <TextField
            label="Number of Children"
            type="number"
            value={numChildren}
            onChange={(e) => {
              setNumChildren(Math.max(0, e.target.value)); // Ensure non-negative number of children
              handleDateChange();
            }}
            fullWidth
          />
        </div>

        <Typography variant="h6">Total Price: ${totalPrice}</Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={handleSubmit}
        >
          Confirm Booking
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default BookingForm;
