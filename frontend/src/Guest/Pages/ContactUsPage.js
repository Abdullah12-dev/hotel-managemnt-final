import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    if (file) formData.append("file", file);

    setLoading(true);

    try {
      await axios.post("/api/contact", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      setError("");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setError("There was an error submitting your request. Please try again.");
    }

    setLoading(false);
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
        Contact Us
      </Typography>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Your message has been sent successfully! We will get back to you
          shortly.
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Subject */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Subject</InputLabel>
              <Select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                label="Subject"
              >
                <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                <MenuItem value="Support">Support</MenuItem>
                <MenuItem value="Feedback">Feedback</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <FormHelperText>
                Choose the subject of your inquiry
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Message */}
          <Grid item xs={12}>
            <TextField
              label="Your Message"
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Attach File */}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Attach File
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            {file && (
              <Typography variant="body2" color="textSecondary">
                File: {file.name}
              </Typography>
            )}
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1 }}
            >
              {loading ? <CircularProgress size={24} /> : "Send Message"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactUsPage;
