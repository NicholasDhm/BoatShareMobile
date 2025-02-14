import axios from 'axios';
import { Boat } from '../types/boat';

const BASE_URL = 'http://192.168.1.12:3333/boats'; // Ensure correct base path

export const boatsApi = {
  getBoats: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data.boats;
    } catch (error) {
      console.error('Error fetching boats:', error);
      throw error;
    }
  },

  getBoatById: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data.boat;
    } catch (error) {
      console.error('Error fetching boat:', error);
      throw error;
    }
  },

  getBoatsByUserId: async (userId: string): Promise<Boat[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/${userId}/boats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user-boats:', error);
      throw error;
    }
  },

  createBoat: async (name: string, capacity: number) => {
    try {
      const response = await axios.post(`${BASE_URL}`, { name, capacity });
      return response.data;
    } catch (error) {
      console.error('Error creating boat:', error);
      throw error;
    }
  },

  deleteBoat: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting boat:', error);
      throw error;
    }
  },
};