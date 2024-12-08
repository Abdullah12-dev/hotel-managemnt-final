import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#0D1D3F",
        color: "#fff",
        py: 4,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          sx={{
            flexDirection: {
              xs: "column", // Stack columns vertically on mobile devices
              sm: "row",
            },
          }}
        >
          {/* Column 1: About Us */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              We are committed to providing excellent service and a seamless
              experience for all our guests.
            </Typography>
            <Link href="/about" color="inherit" variant="body2">
              Learn more
            </Link>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Link
              href="/home"
              color="inherit"
              variant="body2"
              sx={{ display: "block", mb: 1 }}
            >
              Home
            </Link>
            <Link
              href="/services"
              color="inherit"
              variant="body2"
              sx={{ display: "block", mb: 1 }}
            >
              Services
            </Link>
            <Link
              href="/contact"
              color="inherit"
              variant="body2"
              sx={{ display: "block", mb: 1 }}
            >
              Contact Us
            </Link>
          </Grid>

          {/* Column 3: Follow Us */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Follow Us
            </Typography>
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <IconButton
                  href="https://facebook.com"
                  target="_blank"
                  color="inherit"
                >
                  <Facebook />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  href="https://twitter.com"
                  target="_blank"
                  color="inherit"
                >
                  <Twitter />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  href="https://instagram.com"
                  target="_blank"
                  color="inherit"
                >
                  <Instagram />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  href="https://linkedin.com"
                  target="_blank"
                  color="inherit"
                >
                  <LinkedIn />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          {/* Column 4: Contact Info */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Address: 1234 Hotel Street, City, Country
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +1 (234) 567-890
            </Typography>
            <Typography variant="body2">Email: support@hotel.com</Typography>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            mt: 4,
            textAlign: {
              xs: "center",
              sm: "center",
            },
            fontSize: {
              xs: "0.8rem",
              sm: "1rem",
            },
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            © {new Date().getFullYear()} Hotel Management. All Rights Reserved.
          </Typography>
          <Link
            href="/privacy-policy"
            color="inherit"
            variant="body2"
            sx={{ mr: 2 }}
          >
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" color="inherit" variant="body2">
            Terms and Conditions
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
