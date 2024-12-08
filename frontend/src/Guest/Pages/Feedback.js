import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/api/guest/feedback",
        { feedback },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSuccess(true);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Provide Feedback
      </Typography>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you for your feedback!
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter your feedback"
          fullWidth
          multiline
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Feedback
        </Button>
      </form>
    </Paper>
  );
};

export default Feedback;
