import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // Akash’s backend

// User Authentication
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
  return res.data;
};

// Generate Blog
export const generateBlog = async (input, format) => {
  const res = await axios.post(`${API_BASE}/generate/blog`, { input, format });
  return res.data.result;
};

// Fetch Saved Content
export const fetchSavedContent = async () => {
  const res = await axios.get(`${API_BASE}/content`);
  return res.data;
};

// Delete Content
export const deleteContent = async (id) => {
  await axios.delete(`${API_BASE}/content/${id}`);
};

// Export Content
export const exportContent = async (id, type) => {
  await axios.get(`${API_BASE}/export/${id}?type=${type}`);
};


