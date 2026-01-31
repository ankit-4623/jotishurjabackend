import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://jotishurjabackend-1.onrender.com/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// ==================== Auth APIs ====================
export const registerUser = async (name, email, password) => {
    const response = await api.post("/users/register", { name, email, password });
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await api.post("/users/login", { email, password });
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post("/users/logout");
    return response.data;
};

export const getUserProfile = async () => {
    const response = await api.get("/users/user");
    return response.data;
};

export const updateUserProfile = async (profileData) => {
    const response = await api.put("/users/user", profileData);
    return response.data;
};

// ==================== OTP & Password Reset APIs ====================
export const sendOtp = async (email) => {
    const response = await api.post("/users/send-otp", { email });
    return response.data;
};

export const checkOtp = async (email, otp) => {
    const response = await api.post("/users/check-otp", { email, otp });
    return response.data;
};

export const resetPassword = async (email, newpassword) => {
    const response = await api.post("/users/reset-password", { email, newpassword });
    return response.data;
};

// ==================== Product APIs ====================
export const getProductById = async (id) => {
    const response = await api.get(`/products/getproduct/${id}`);
    return response.data;
};

export const getAllProducts = async () => {
    const response = await api.get("/products/getallProduct");
    return response.data;
};

export const addProduct = async (formData) => {
    const response = await api.post("/products/addProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/deleteProduct/${id}`);
    return response.data;
};

export const updateProduct = async (id, formData) => {
    const response = await api.put(`/products/updatedProduct/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

// ==================== Cart APIs ====================
export const addToCart = async (productData) => {
    const response = await api.post("/carts/addTocart", productData);
    return response.data;
};

export const removeFromCart = async (id) => {
    const response = await api.post(`/carts/removeFromcart/${id}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await api.post("/carts/clearCart");
    return response.data;
};

export const updateCart = async (cartData) => {
    const response = await api.put("/carts/updateCart", cartData);
    return response.data;
};

export const fetchCart = async () => {
    const response = await api.get("/carts/fetchCart");
    return response.data;
};

// ==================== Address APIs ====================
export const addAddress = async (addressData) => {
    const response = await api.post("/address/addAddress", addressData);
    return response.data;
};

export const getAddress = async (userId) => {
    const response = await api.get(`/address/getaddress/${userId}`);
    return response.data;
};

export const deleteAddress = async (userId, addressId) => {
    const response = await api.delete(`/address/delete/${userId}/${addressId}`);
    return response.data;
};

export const updateAddress = async (userId, addressId, addressData) => {
    const response = await api.put(`/address/update/${userId}/${addressId}`, addressData);
    return response.data;
};

// ==================== Order APIs ====================
export const createOrder = async (orderData) => {
    const response = await api.post("/order/addOrder", orderData);
    return response.data;
};

// Admin: Get all orders
export const getAllAdminOrders = async () => {
    const response = await api.get("/order/admin/all");
    return response.data;
};

// Admin: Update order status
export const updateAdminOrderStatus = async (id, status) => {
    const response = await api.put(`/order/admin/status/${id}`, { status });
    return response.data;
};

// ==================== Consultancy APIs ====================
export const createConsultancyRequest = async (consultancyData) => {
    const response = await api.post("/consultancy/addConsultancy", consultancyData);
    return response.data;
};

export const getAllConsultancyRequests = async () => {
    const response = await api.get("/consultancy/getallreq");
    return response.data;
};

export const getConsultancyRequestById = async (id) => {
    const response = await api.get(`/consultancy/getsinglereq/${id}`);
    return response.data;
};

export const updateConsultancyRequest = async (id, statusData) => {
    const response = await api.put(`/consultancy/updatereq/${id}`, statusData);
    return response.data;
};

export const deleteConsultancyRequest = async (id) => {
    const response = await api.delete(`/consultancy/deletereq/${id}`);
    return response.data;
};

// Admin: Get all consultancy requests (not filtered by user)
export const getAdminAllConsultancyRequests = async () => {
    const response = await api.get("/consultancy/admin/all");
    return response.data;
};

// ==================== Service APIs ====================
export const getDailyHoroscope = async (sign) => {
    const response = await api.get(`/services/dailyhoroscope?sign=${sign}`);
    return response.data;
};

export const matchmaking = async (matchData) => {
    const response = await api.post("/services/matchmaking", matchData);
    return response.data;
};

export const getFreeKundali = async (kundaliData) => {
    const response = await api.post("/services/freekundli", kundaliData);
    return response.data;
};

// ==================== Puja Booking APIs ====================
export const createPujaBooking = async (bookingData) => {
    const response = await api.post("/puja/addBooking", bookingData);
    return response.data;
};

export const getUserPujaBookings = async () => {
    const response = await api.get("/puja/getallbookings");
    return response.data;
};

// Admin: Get all puja bookings
export const getAdminAllPujaBookings = async () => {
    const response = await api.get("/puja/admin/all");
    return response.data;
};

// Admin: Update puja booking status
export const updatePujaBookingStatus = async (id, status) => {
    const response = await api.put(`/puja/status/${id}`, { status });
    return response.data;
};

// Admin: Get dashboard stats
export const getAdminStats = async (year) => {
    const response = await api.get(`/order/admin/stats${year ? `?year=${year}` : ''}`);
    return response.data;
};

// ==================== Payment APIs ====================
export const getRazorpayKey = async () => {
    const response = await api.get("/payment/getKey");
    return response.data;
};

export const createPaymentOrder = async (amount) => {
    const response = await api.post("/payment/process", { amount });
    return response.data;
};

export const verifyPayment = async (paymentData) => {
    const response = await api.post("/payment/verify", paymentData);
    return response.data;
};

// ==================== Gallery APIs ====================
export const getGalleryMedia = async (type = "all", category = "all") => {
    const params = new URLSearchParams();
    if (type !== "all") params.append("type", type);
    if (category !== "all") params.append("category", category);
    const response = await api.get(`/gallery?${params.toString()}`);
    return response.data;
};

export const uploadGalleryMedia = async (formData) => {
    const response = await api.post("/gallery/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deleteGalleryMedia = async (id) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
};

export default api;

