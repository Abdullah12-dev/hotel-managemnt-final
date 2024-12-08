// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BookingHistory = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch the booking history for the logged-in guest
//     const fetchBookingHistory = async () => {
//       try {
//         const response = await axios.get("/api/guest/bookings", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setBookings(response.data);
//       } catch (error) {
//         console.error("Error fetching booking history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingHistory();
//   }, []);

//   const handleCancelBooking = async (bookingId) => {
//     try {
//       await axios.delete(`/api/guest/bookings/${bookingId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setBookings((prev) =>
//         prev.filter((booking) => booking._id !== bookingId)
//       );
//     } catch (error) {
//       console.error("Error canceling booking:", error);
//     }
//   };

//   if (loading) return <p>Loading booking history...</p>;

//   return (
//     <div>
//       <h2>Your Booking History</h2>
//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <ul>
//           {bookings.map((booking) => (
//             <li key={booking._id}>
//               <h3>{booking.room.name}</h3>
//               <p>
//                 From: {new Date(booking.startDate).toLocaleDateString()} - To:{" "}
//                 {new Date(booking.endDate).toLocaleDateString()}
//               </p>
//               <p>Status: {booking.status}</p>
//               {booking.status === "Upcoming" && (
//                 <button onClick={() => handleCancelBooking(booking._id)}>
//                   Cancel Booking
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default BookingHistory;
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";

// BookingHistory component
const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching booking history for the logged-in guest
    const fetchBookingHistory = async () => {
      setLoading(true);
      setTimeout(() => {
        const dummyData = [
          {
            _id: "1",
            room: { name: "Single Room" },
            startDate: "2024-12-10T14:00:00Z",
            endDate: "2024-12-12T12:00:00Z",
            status: "Upcoming",
          },
          {
            _id: "2",
            room: { name: "Double Room" },
            startDate: "2024-11-25T14:00:00Z",
            endDate: "2024-11-30T12:00:00Z",
            status: "Completed",
          },
          {
            _id: "3",
            room: { name: "Suite" },
            startDate: "2024-12-05T14:00:00Z",
            endDate: "2024-12-07T12:00:00Z",
            status: "Upcoming",
          },
        ];

        setBookings(dummyData);
        setLoading(false);
      }, 1000);
    };

    fetchBookingHistory();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      setBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  if (loading) return <Typography>Loading booking history...</Typography>;

  return (
    <Box sx={{ p: 4, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Your Booking History
      </Typography>
      {bookings.length === 0 ? (
        <Typography align="center" sx={{ mt: 2 }}>
          No bookings found.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  },
                  borderRadius: "8px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {booking.room.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    From: {new Date(booking.startDate).toLocaleDateString()} -
                    To: {new Date(booking.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Status: {booking.status}
                  </Typography>
                  {booking.status === "Upcoming" && (
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => handleCancelBooking(booking._id)}
                      sx={{
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#d32f2f",
                        },
                      }}
                    >
                      Cancel Booking
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BookingHistory;
