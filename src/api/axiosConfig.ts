import axios from "axios";
// More info: https://create-react-app.dev/docs/adding-custom-environment-variables/ 
const isProdEnv = process.env.NODE_ENV === "production";

const axiosInstance = axios.create({
  // TODO: add production backend server URL instead of api.example.com.
  baseURL: isProdEnv ? "https://api.example.com" : "http://localhost:4000",
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
