import axios from "axios";

// 1. Axios instance உருவாக்குதல்
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/", // உங்கள் Django backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor: ஒவ்வொரு request போகும் முன்பும் இது இயங்கும்
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;