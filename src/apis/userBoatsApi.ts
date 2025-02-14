import axios from 'axios';

const BASE_URL = 'http://192.168.1.12:3333/user-boats'; // Use your local backend URL or ngrok link

export const userBoatsApi = {
  createUserBoat: async (userId: string, boatId: string) => {
    try {    
      const response = await axios.post(`${BASE_URL}`, {
        userId,
        boatId,
        role: "Admin",
        standardQuota: 2,
        substitutionQuota: 2,
        contingencyQuota: 1,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user-boat contract:', error);
      throw error;
    }
  },

  getUserBoats: async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data.userBoats;
    } catch (error) {
      console.error('Error fetching user-boats:', error);
      throw error;
    }
  },

  getUserBoatsByUserId: async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/getByUser/${userId}`);
      return response.data.userBoat;
    } catch (error) {
      console.error('Error fetching user-boat by user ID:', error);
      throw error;
    }
  },

  getUserBoatsByBoatId: async (boatId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/getByBoat/${boatId}`);
      return response.data.userBoat;
    } catch (error) {
      console.error('Error fetching user-boat by boat ID:', error);
      throw error;
    }
  },
};
