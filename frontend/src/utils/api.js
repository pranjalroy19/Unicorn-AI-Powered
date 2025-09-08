// src/utils/api.js
import axios from "axios";

// ✅ Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // 🔧 update if backend runs elsewhere
});

// ✅ Named exports (helper functions)
export const fetchSavedContent = async () => {
  const response = await api.get("/content");
  return response.data;
};

export const generateBlog = async (data) => {
  const response = await api.post("/generate-blog", data);
  return response.data;
};

export const exportContent = async (id) => {
  const response = await api.get(`/export/${id}`);
  return response.data;
};

export const deleteContent = async (id) => {
  const response = await api.delete(`/content/${id}`);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

// ✅ Default export (so you can do `import api from "../utils/api"`)
export default api;
