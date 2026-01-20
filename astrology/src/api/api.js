import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Auth APIs
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

// OTP & Password Reset APIs
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

export default api;
