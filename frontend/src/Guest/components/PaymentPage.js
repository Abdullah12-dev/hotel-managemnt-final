import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom"; // Import useLocation

// Card images
import visaIcon from "../assets/visa.png"; // Add your image paths
import mastercardIcon from "../assets/mastercard.png"; // Add your image paths
import amexIcon from "../assets/paypal.png"; // Add your image paths

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const location = useLocation(); // Use useLocation hook
  const bookingDetails = location.state?.bookingDetails; // Access bookingDetails from state

  if (!bookingDetails) {
    return <Typography variant="h6">No booking details found.</Typography>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment process (replace with actual payment gateway logic)
    setTimeout(() => {
      alert("Payment successful! Your booking is confirmed.");
      setLoading(false);
      // Redirect or show success page
    }, 2000);
  };

  const getCardIcons = () => {
    // Here you can add logic to determine which icons to show based on the card number format.
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <img
          src={visaIcon}
          alt="Visa"
          style={{ width: "40px", marginRight: "10px" }}
        />
        <img
          src={mastercardIcon}
          alt="MasterCard"
          style={{ width: "40px", marginRight: "10px" }}
        />
        <img src={amexIcon} alt="American Express" style={{ width: "40px" }} />
      </div>
    );
  };

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        sx={{
          padding: "30px",
          width: "100%",
          maxWidth: "500px",
          borderRadius: "8px",
          boxShadow: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Complete Your Payment
        </Typography>

        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <Typography variant="h6">Booking Details</Typography>
          <Typography variant="body1">
            Room: {bookingDetails.roomName}
          </Typography>
          <Typography variant="body1">
            Total Price: ${bookingDetails.totalPrice}
          </Typography>
        </div>

        <form onSubmit={handlePayment}>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="Card Number"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ borderRadius: "4px", backgroundColor: "#f9f9f9" }}
            />
          </div>

          {/* Display card icons below the card number input */}
          {getCardIcons()}

          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="Expiration Date (MM/YY)"
              name="expirationDate"
              value={paymentDetails.expirationDate}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ borderRadius: "4px", backgroundColor: "#f9f9f9" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="CVV"
              name="cvv"
              type="password"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ borderRadius: "4px", backgroundColor: "#f9f9f9" }}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            fullWidth
            sx={{
              padding: "10px",
              marginTop: "20px",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Pay Now"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PaymentPage;
