import axios from 'axios';

const BASE_URL = 'http://192.168.1.100:3000'; // Use your local backend URL or ngrok link

export const boatsApi = {
  getBoats: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/boats`);
      return response.data.boats;
    } catch (error) {
      console.error('Error fetching boats:', error);
      throw error;
    }
  },

  getBoatById: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/boats/${id}`);
      return response.data.boat;
    } catch (error) {
      console.error('Error fetching boat:', error);
      throw error;
    }
  },

  createBoat: async (name: string, capacity: number) => {
    try {
      const response = await axios.post(`${BASE_URL}/boats`, { name, capacity });
      return response.data;
    } catch (error) {
      console.error('Error creating boat:', error);
      throw error;
    }
  },

  deleteBoat: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/boats/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting boat:', error);
      throw error;
    }
  },
};
