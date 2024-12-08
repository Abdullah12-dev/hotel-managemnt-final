import axios from 'axios';

const API = axios.create({ baseURL: 'https://hotel-managemnt-final-oqgk.vercel.app' });

// Custom error handler
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        return { message: data.message || 'Invalid request. Please check your input.', type: 'warning' };
      case 401:
        return { message: data.message || 'Authentication failed. Please log in again.', type: 'error' };
      case 403:
        return { message: data.message || 'You do not have permission to access this resource.', type: 'error' };
      case 404:
        return { message: data.message || 'The requested resource was not found.', type: 'warning' };
      case 500:
        return { message: 'Server error. Please try again later.', type: 'error' };
      default:
        return { message: data.message || 'An unexpected error occurred.', type: 'error' };
    }
  } else if (error.request) {
    return { message: 'No response received from server. Please check your network connection.', type: 'error' };
  } else {
    return { message: error.message || 'An unexpected error occurred.', type: 'error' };
  }
};

// Attach token to every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth API functions
export const login = async (formData) => {
  try {
    const response = await API.post('/auth/login', formData);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const signup = async (formData) => {
  try {
    const response = await API.post('/auth/signup', formData);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const googleLogin = async (credential) => {
  try {
    const response = await API.post('/auth/google', { credential });
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};


// Forgot Password API - send reset token to email
export const forgotPassword = async (email) => {
  try {
    console.log(email.email);
    const response = await API.post('/auths/forgot-password', { email });
    
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Reset Password API - reset password with token and new password
export const resetPassword = async ({ email, code, newPassword }) => {
  try {
    const response = await API.post('/auths/reset-password', { email, code, newPassword });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


// Staff API functions
export const addStaff = async (staffData) => {
  try {
    const response = await API.post('/staff/add', staffData);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const editStaff = async (id, updates) => {
  try {
    const response = await API.put(`/staff/edit/${id}`, updates);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteStaff = async (id) => {
  try {
    const response = await API.delete(`/staff/delete/${id}`);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const assignRole = async (id, role) => {
  try {
    const response = await API.patch(`/staff/assign-role/${id}`, { role });
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getPerformanceMetrics = async (id) => {
  try {
    const response = await API.get(`/staff/performance/${id}`);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchAllStaff = async () => {
  try {
    const response = await API.get('/staff/all');
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Room API functions
export const addRoom = async (roomData) => {
  try {
    const response = await API.post('/rooms/add', roomData);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const editRoom = async (id, updates) => {
  try {
    const response = await API.put(`/rooms/edit/${id}`, updates);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await API.delete(`/rooms/delete/${id}`);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchAllRooms = async () => {
  try {
    const response = await API.get('/rooms/all');
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchRoomById = async (id) => {
  try {
    const response = await API.get(`/rooms/${id}`);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};


// Service API functions
export const addService = async (serviceData) => {
  try {
    const response = await API.post('/services/add', serviceData);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const editService = async (id, updates) => {
  try {
    const response = await API.put(`/services/edit/${id}`, updates);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteService = async (id) => {
  try {
    const response = await API.delete(`/services/delete/${id}`);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchAllServices = async () => {
  try {
    const response = await API.get('/services/all');
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchServiceById = async (id) => {
  try {
    const response = await API.get(`/services/${id}`);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchSystemLogs = async () => {
  try {
      const response = await API.get('/system-logs/all');
      return response;
  } catch (error) {
      throw handleApiError(error);
  }
};


// Hotel Stats API functions

// Fetch summary statistics (bookings, revenue, occupancy rate, etc.)
export const fetchSummaryStats = async () => {
  try {
    const response = await API.get('/hotel-stats/summary');
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Fetch all booking data
export const fetchBookingDetails = async () => {
  try {
    const response = await API.get(`/hotel-stats/bookings`);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const sendNotification = async ({ staffId, email, phoneNumber, subject, message }) => {
  try {
    
    const response = await API.post('/notifications/send', {
      staffId,
      email,
      phoneNumber,
      subject,
      message,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};



const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const WEATHER_API_KEY = '07c4fc833f325d21777a7bff1522cf45'; // Replace with your OpenWeather API key
// Weather API Functions
export const fetchWeatherData = async (city, lat, lon) => {
  try {
    const endpoint = city
      ? `${WEATHER_API_BASE_URL}weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      : `${WEATHER_API_BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const fetchWeatherDataByCoords = async (lat, lon) => {
  try {
    const endpoint = `${WEATHER_API_BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getSettings = async () => {
  try {
    const response = await API.get('/settings');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Update settings (policy and notification preferences)
export const updateSettings = async (settings) => {
  try {
    const response = await API.put('/settings', settings);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Reset settings to default
export const resetSettings = async () => {
  try {
    const response = await API.delete('/settings');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


// receptionist API's
// Guest API functions
export const addGuest = async (guestData) => {
  try {
    const response = await API.post('/guests/add', guestData);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const editGuest = async (id, updates) => {
  try {
    const response = await API.put(`/guests/edit/${id}`, updates);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteGuest = async (id) => {
  try {
    const response = await API.delete(`/guests/delete/${id}`);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchAllGuests = async () => {
  try {
    const response = await API.get('/guests/all');
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getGuestBookings = async (guestId) => {
  try {
    const response = await API.get(`/guests/${guestId}/bookings`);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Guest API functions

// Fetch guest by ID (new function)
export const getGuestById = async (guestId) => {
  try {
    const response = await API.get(`/guests/${guestId}`);
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const fetchAllRoomsManage = async () => {
  try {
    const response = await API.get('/room-manage/all');
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchAvailableRooms = async () => {
  try {
    const response = await API.get('/room-manage/available');
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};


// Room API functions
export const updateRoomStatus = async (roomId, updates) => {
  try {
    const response = await API.put(`/room-manage/updateStatus/${roomId}`, updates);
    return response;  // Returns the updated room data
  } catch (error) {
    throw handleApiError(error);
  }
};


// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await API.post('/bookings/create', bookingData);
    return response; // Returns the booking details
  } catch (error) {
    throw handleApiError(error);
  }
};


// Create a new booking
export const fetchBookings = async () => {
  try {
    const response = await API.get('/bookings/');
    return response; // Returns the booking details
  } catch (error) {
    throw handleApiError(error);
  }
};


// Fetch all service requests
export const fetchAllServiceRequests = async () => {
  try {
    const response = await API.get('/service-requests');
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Update service request status
export const updateServiceRequestStatus = async (requestId, newStatus) => {
  try {
    const response = await API.patch(`/service-requests/${requestId}`, { status: newStatus });
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Send Notification API function
export const sendNotificationToGuest = async (guestId, message) => {
  try {
    console.log(guestId);
    const response = await API.post(`/guest/${guestId}/notify`, { message });
    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};





//Guest



// Submit feedback API function
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await API.post("/feedback", feedbackData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Process payment API function
export const processPayment = async (paymentData) => {
  try {
    const response = await API.post("/payment", paymentData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Gemini API integration
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const GEMINI_API_KEY = "AIzaSyAHDIY1s15Xeuk-HK0MTCIpPXeMDiWEywM";
// Replace with your Gemini API key

export const callGeminiApi = async (prompt) => {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        prompt: {
          text: prompt,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GEMINI_API_KEY}`,
        },
      }
    );
    return response.data.candidates?.[0]?.content || "No response from Gemini.";
  } catch (error) {
    throw handleApiError(error);
  }
};



// Export error handler for potential custom use
export { handleApiError };
