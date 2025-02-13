import axios from 'axios';

const BASE_URL = 'http://192.168.1.100:3000'; // Use your local backend URL or ngrok link

export const userBoatsApi = {
  createUserBoat: async (userId: string, boatId: string, role: string, standardQuota: number, substitutionQuota: number, contingencyQuota: number) => {
    try {
      const response = await axios.post(`${BASE_URL}/userBoats`, {
        userId, boatId, role, standardQuota, substitutionQuota, contingencyQuota
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user-boat contract:', error);
      throw error;
    }
  },

  getUserBoats: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/userBoats`);
      return response.data.userBoats;
    } catch (error) {
      console.error('Error fetching user-boats:', error);
      throw error;
    }
  },

  getUserBoatsByUserId: async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/userBoats/getByUser/${userId}`);
      return response.data.userBoat;
    } catch (error) {
      console.error('Error fetching user-boat by user ID:', error);
      throw error;
    }
  },

  getUserBoatsByBoatId: async (boatId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/userBoats/getByBoat/${boatId}`);
      return response.data.userBoat;
    } catch (error) {
      console.error('Error fetching user-boat by boat ID:', error);
      throw error;
    }
  },
};
