import React, { useState, useEffect, useMemo } from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Navigate 
} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure this is imported correctly
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import StaffManagement from './Pages/StaffManagement';
import RootLayout from './Pages/RootLayout';
import NotifyStaff from './Pages/NotifyStaff';
import RoomManagement from './Pages/RoomManagement';
import ServiceManagement from './Pages/ServiceManagement';
import BookingHistory from './Pages/BookingHistory';
import SystemLogs from './Pages/SystemLogs';
import WeatherDashboard from './Pages/WeatherDashboard';
import Settings from './Pages/Settings';

// Receptionist Pages
import GuestManagement from './receptionistpages/GuestManagment';
import ReceptionistDashboard from './receptionistpages/ReceptionistDashboard';
import ReceptionistRootLayout from './receptionistpages/RootLayout';
import ReceptionistRoomManagement from './receptionistpages/RoomManagement';
import CheckOut from './receptionistpages/CheckOut';
import BookingManagment from './receptionistpages/BookingManagment';
import ServiceRequestManagement from './receptionistpages/ServicesRequest';
import ReceptionistWeatherDashboard from './receptionistpages/WeatherDashboard';


//Guest Pages

import GuestDashboard from "./Guest/Pages/Dashboard";
import GuestRootLayout from "./Guest/Pages/RootLayout";
import GuestRoomManagement from "./Guest/Pages/RoomManagement";
import ServiceRequest from "./Guest/Pages/ServiceRequest";
import GuestBookingHistory from "./Guest/Pages/BookingHistory";
import PaymentPage from "./Guest/components/PaymentPage";
import FeedbackPage from "./Guest/Pages/FeedbackPage";
import ContactUsPage from "./Guest/Pages/ContactUsPage";
import GeminiChatbot from "./Guest/components/GeminiChatbot";
import ChatModal from "./Guest/components/ChatModal";
import Footer from "./Guest/components/Footer";

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated 
    ? children 
    : <Navigate to="/login" replace />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Retrieve role from localStorage
  
    const checkToken = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);
  
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            setIsAuthenticated(false);
            localStorage.removeItem('token');
            localStorage.removeItem('role'); // Clear role if token is invalid
          } else {
            setIsAuthenticated(true);
            setUserInfo({
              userId: decodedToken.userId,
              name: decodedToken.name,
              role: role,
            });
          }
        } catch (error) {
          console.error('Invalid Token:', error);
          setIsAuthenticated(false);
          localStorage.removeItem('token');
          localStorage.removeItem('role');
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
  
    checkToken();
  
    window.addEventListener('storage', checkToken);
  
    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const router = useMemo(() =>
    createBrowserRouter([
      {
        path: '/',
        element: loading ? (
          <div>Loading...</div>
        ) : isAuthenticated ? (
          userInfo.role === 'Admin' ? (
            <Navigate to="/dashboard" replace />
          ) : userInfo.role === 'Receptionist' ? (
            <Navigate to="/receptionistdashboard" replace />
          ) : userInfo.role === 'Guest' ? (
            <Navigate to="/guestdashboard" replace />
          ) : (
            <Navigate to="/login" replace /> // Fallback for unknown roles
          )
        ) : (
          <Navigate to="/login" replace />
        ),
      },
      {
        path: '/login',
        element: <Login setAuth={setIsAuthenticated} setUserInfo={setUserInfo} />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
            <RootLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'staff-management', element: <StaffManagement /> },
          { path: 'NotifyStaff', element: <NotifyStaff /> },
          { path: 'room-managment', element: <RoomManagement /> },
          { path: 'service-managment', element: <ServiceManagement /> },
          { path: 'booking-history', element: <BookingHistory /> },
          { path: 'systemLogs', element: <SystemLogs /> },
          { path: 'weatherDashboard', element: <WeatherDashboard /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
      {
        path: '/receptionistdashboard',
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
            <ReceptionistRootLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <ReceptionistDashboard /> },
          { path: 'checkIN', element: <CheckOut /> },
          { path: 'checkout', element: <CheckOut /> },
          { path: 'guest-management', element: <GuestManagement /> },
          { path: 'rooms-management', element: <ReceptionistRoomManagement /> },
          { path: 'booking-management', element: <BookingManagment /> },
          { path: 'ServiceRequest-management', element: <ServiceRequestManagement /> },
          { path: 'weatherDashboard', element: <ReceptionistWeatherDashboard /> },
        ],
      },
      {
        path: "/guestdashboard",
        element: <GuestRootLayout />,
        children: [
          { index: true, element: <GuestDashboard /> },
          { path: "room-management", element: <GuestRoomManagement /> },
          { path: "service-management", element: <ServiceRequest /> },
          { path: "booking-history", element: <GuestBookingHistory /> },
          { path: "weather-dashboard", element: <WeatherDashboard /> },
          { path: "payment", element: <PaymentPage /> },
          { path: "feedback", element: <FeedbackPage /> },
          { path: "contact-us", element: <ContactUsPage /> },
        ],
      },
    ]), [isAuthenticated, loading, userInfo]);

  // Return different layout for GuestDashboard
  if (userInfo.role === 'Guest') {
    return (
      <>
        <RouterProvider router={router} />
        <GeminiChatbot />
        {modalVisible && <ChatModal onClose={toggleModal} />}
        <Footer />
      </>
    );
  }

  // Default return for other roles
  return <RouterProvider router={router} />;
};

export default App;
