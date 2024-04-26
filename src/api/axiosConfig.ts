import axios from "axios";

const isDevEnv = process.env.NODE_ENV === "development";

const axiosInstance = axios.create({
  // TODO: add production backend server URL instead of api.example.com.
  baseURL: isDevEnv ? "http://localhost:4000" : "https://api.example.com",
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
