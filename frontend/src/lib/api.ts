import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log("🧱 interceptors request called ");
  config.headers.test = "test set variable for config";
  console.log("config after set variable: ", config);
  return config;
});

api.interceptors.response.use((response) => {
  console.log("🧱 interceptors response called ");
  console.log("response: ", response);
  return response;
});

export default api;
