import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Rating,
  Paper,
  Alert,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [experienceType, setExperienceType] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !experienceType || !satisfaction) {
      setError("Please fill in all required fields.");
      return;
    }

    const feedbackData = {
      rating,
      comments,
      experienceType,
      suggestions,
      satisfaction,
    };

    try {
      await axios.post("/api/guest/feedback", feedbackData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess(true);
      setError("");
      setRating(0);
      setComments("");
      setExperienceType("");
      setSuggestions("");
      setSatisfaction("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: 700,
        mx: "auto",
        mt: 4,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ color: "#1976d2" }}
      >
        We Value Your Feedback
      </Typography>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you for your feedback! We will use it to improve our services.
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Rating */}
          <Grid item xs={12}>
            <Typography variant="h6">Rate Your Overall Experience</Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              precision={0.5}
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Type of Experience */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Type of Experience</InputLabel>
              <Select
                value={experienceType}
                onChange={(e) => setExperienceType(e.target.value)}
                label="Type of Experience"
              >
                <MenuItem value="Room">Room</MenuItem>
                <MenuItem value="Service">Service</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Facilities">Facilities</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <FormHelperText>Choose your experience type</FormHelperText>
            </FormControl>
          </Grid>

          {/* Suggestions for Improvement */}
          <Grid item xs={12}>
            <TextField
              label="Suggestions for Improvement"
              fullWidth
              multiline
              rows={4}
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Satisfaction */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Overall Satisfaction</InputLabel>
              <Select
                value={satisfaction}
                onChange={(e) => setSatisfaction(e.target.value)}
                label="Overall Satisfaction"
              >
                <MenuItem value="Very Satisfied">Very Satisfied</MenuItem>
                <MenuItem value="Satisfied">Satisfied</MenuItem>
                <MenuItem value="Neutral">Neutral</MenuItem>
                <MenuItem value="Dissatisfied">Dissatisfied</MenuItem>
                <MenuItem value="Very Dissatisfied">Very Dissatisfied</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Comments */}
          <Grid item xs={12}>
            <TextField
              label="Additional Comments"
              fullWidth
              multiline
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1 }}
            >
              Submit Feedback
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default FeedbackPage;
