// frontend/src/api/userApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if your backend runs elsewhere
});

// Register user
export const registerUser = async (formData) => {
  try {
    const res = await API.post("/auth/register", formData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};
