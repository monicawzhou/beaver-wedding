import axios from "axios";

const API_URL = "http://localhost:3000";

export const getGuests = async () => {
  const response = await axios.get(`${API_URL}/guests`);
  return response.data;
};

export const createGuest = async (guestData) => {
  const response = await axios.post(`${API_URL}/guests`, guestData);
  return response.data;
};

export const updateGuest = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/guests/${id}`, updatedData);
  return response.data;
};

export const deleteGuest = async (id) => {
  const response = await axios.delete(`${API_URL}/guests/${id}`);
  return response.data;
};
