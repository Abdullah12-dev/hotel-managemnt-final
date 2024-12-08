import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/guest/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("/api/guest/profile", profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Your Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          name="name"
          value={profile.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          name="email"
          value={profile.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Profile
        </Button>
      </form>
    </Paper>
  );
};

export default Profile;
