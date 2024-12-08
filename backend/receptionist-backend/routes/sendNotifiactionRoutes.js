const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Booking = require('../../models/Booking');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your preferred email service
  auth: {
    user: 'abdullahilyas455@gmail.com', // Set in environment variables
    pass: 'euak mura glqs xjnp', // Set in environment variables
  },
});

router.post('/:guestId/notify', async (req, res) => {
  console.log(process.env.EMAIL_USERNAME+process.env.EMAIL_PASSWORD)
  const { guestId } = req.params;
  const { message } = req.body;
  console.log(guestId)
  if (!message) {
    return res.status(400).json({ message: 'Notification message is required.' });
  }

  // Validate guestId as a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(guestId)) {
    return res.status(400).json({ message: 'Invalid guest ID format.' });
  }

  try {
    // Fetch guest details
    const guest = await User.findById(guestId);
    console.log(guest);


    if (!guest) {
      return res.status(404).json({ message: 'Guest not found.' });
    }

    // Fetch booking details for the guest
    const bookings = await Booking.find({ guest: guestId }).populate('room'); // Populate room details if needed

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this guest.' });
    }

    // Format booking details into the message
    const bookingDetails = bookings
      .map(
        (booking) =>
          `Booking ID: ${booking._id}\nRoom: ${booking.room?.roomNumber || 'N/A'}\nCheck-In: ${booking.checkInDate}\nCheck-Out: ${booking.checkOutDate}\n`
      )
      .join('\n');

    const fullMessage = `${message}\n\nBooking Details:\n${bookingDetails}`;
      console.log(guest.email)
    // Send email
    await transporter.sendMail({
      from:process.env.EMAIL_USERNAME,
      to:guest.email,
      subject: 'Booking Notification',
      text: fullMessage,
    });

    console.log(`Notification email sent to ${guest.email}`);
    return res.status(200).json({ message: 'Notification email sent successfully.' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ message: 'Server error while sending notification.' });
  }
});

module.exports = router;
