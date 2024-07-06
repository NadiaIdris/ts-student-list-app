import axios from "axios";

let actualUrl = process.env.NODE_ENV === "production" ? "http://mylisty.com/secureapi/" : "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: actualUrl,
  timeout: 20000, // Set timeout for this instance to 20 seconds
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance };
