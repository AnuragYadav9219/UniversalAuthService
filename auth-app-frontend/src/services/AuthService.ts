import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type RegisterData from "@/models/RegisterData";

export const registerUser = async (signupData: RegisterData) => {
    // API call to server to save data
    const response = await apiClient.post(`/auth/register`, signupData);
    return response.data;
};

// Login
export const loginUser = async (loginData: LoginData) => {
    const response = await apiClient.post(`/auth/login`, loginData);
    return response.data;
}

// Get current Login User

// Refresh Token