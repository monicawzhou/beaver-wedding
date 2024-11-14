import axios from "axios";

const API_URL = "http://localhost:3000";

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (guestData) => {
  const response = await axios.post(`${API_URL}/tasks`, guestData);
  return response.data;
};

export const updateTask = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, updatedData);
  return response.data;
};
