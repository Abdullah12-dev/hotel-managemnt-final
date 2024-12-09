const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const authRoutes = require('./admin-Backend/routes/authRoutes');
const passwordResetRoutes = require('./admin-Backend/routes/passwordResetRoutes');
const { errorHandler } = require('./admin-Backend/middlewares/errorMiddleware');
const staffRoutes = require('./admin-Backend/routes/staffRoutes');
const roomRoute =require('./admin-Backend/routes/roomRoutes');
const seviceRoutes =require('./admin-Backend/routes/serviceRoutes');
const hotelStatsRoutes = require('./admin-Backend/routes/hotelStatsRoutes');
const logRoutes = require('./admin-Backend/routes/logRoutes');
const notificationRoutes = require('./admin-Backend/routes/notificationRoutes');
const SettingRoutes = require('./admin-Backend/routes/SettingRoutes');


const guestRoutes = require('./receptionist-backend/routes/guestRoutes');
const roommanageRoutes =require('./receptionist-backend/routes/room-manageRoutes');
const bookingRoutes =require('./receptionist-backend/routes/bookingRoutes');
const serviceRequestRoutes =require('./receptionist-backend/routes/serviceRequestRoutes');
const sendNotifiactionRoutes =require('./receptionist-backend/routes/sendNotifiactionRoutes');


dotenv.config();
connectDB();

const app = express();

// Middleware

app.use(cors({ origin: 'https://hotel-managemnt-final-git-main-abdullahs-projects-d02196df.vercel.app/' }));
app.use(express.json());

// Admin
app.use('/auth', authRoutes);
app.use('/auths', passwordResetRoutes);
app.use('/staff',staffRoutes)
app.use('/rooms',roomRoute)
app.use('/services',seviceRoutes)
app.use('/hotel-stats', hotelStatsRoutes);
app.use('/system-logs', logRoutes);
app.use('/settings', SettingRoutes);
app.use('/notifications', notificationRoutes);

//Receptionist

app.use('/guests', guestRoutes);
app.use('/room-manage', roommanageRoutes);
app.use('/bookings', bookingRoutes);
app.use('/service-requests', serviceRequestRoutes);
app.use('/guest',sendNotifiactionRoutes);



// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
