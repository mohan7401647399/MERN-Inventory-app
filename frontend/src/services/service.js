import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

//  Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData, { withCredentials: true });
        if (response.statusText === "OK") {
            toast.success("User Registered")
        }
        return response.data
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(msg)
    }
}

//  Login User
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData, { withCredentials: true })
        if (response.statusText === "OK") {
            toast.success("User Login successfully....")
        }
        return response.data
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(msg)
    }
}

//  Logout
export const logoutUser = async () => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`)
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(msg)
    }
}

//  Forgot
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, email);
        toast.success(response.data.message)
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(msg)
    }
}

//  Reset
export const resetPassword = async (email, resetToken) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, email);
        return response.data
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(msg)
    }
}

//  get login status
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedIn`);
        return response.data
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(msg)
    }
}

// Get User Profile
export const getUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/getuser`);
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};
// Update Profile
export const updateUser = async (formData) => {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/users/updateuser`,
            formData
        );
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};
// Change Password
export const changePassword = async (formData) => {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/users/changepassword`,
            formData
        );
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};