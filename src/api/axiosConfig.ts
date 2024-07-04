import axios from "axios";

let protocol = window.location.protocol; // 'http:'
let hostname = window.location.hostname; // 'localhost'
let port = 4000;
let pathname = window.location.pathname; // '/students'
let actualUrl = `${protocol}//${hostname}:${port}${pathname}`;

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
