import { UserBoat } from '../@types/user-boat';
import { api } from './api';

export const userBoatsApi = {
  // Create a new user-boat association
  async createUserBoat(userId: string, boatId: string): Promise<UserBoat> {
    const response = await api.post('/user-boats', {
      userId,
      boatId,
      role: "admin",
      standardQuota: 2,
      substitutionQuota: 2,
      contingencyQuota: 1,
    });
    if (response.status !== 201) {
      throw new Error(response.data.message);
    }
    return response.data;
  },

  // Fetch all user-boat associations
  async getUserBoats(): Promise<UserBoat[]> {
    const response = await api.get('/user-boats');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.userBoats;
  },

  // Fetch user-boat associations by user ID
  async getUserBoatsByUserId(userId: string): Promise<UserBoat[]> {
    const response = await api.get(`/user-boats/get-by-user/${userId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.userBoat;
  },

  // Fetch user-boat associations by boat ID
  async getUserBoatsByBoatId(boatId: string): Promise<UserBoat[]> {
    const response = await api.get(`/user-boats/get-by-boat/${boatId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.userBoat;
  },

  // Get a user-boat association by user boat id
  async getUserBoatById(userBoatId: string): Promise<UserBoat> {
    const response = await api.get(`/user-boats/${userBoatId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.userBoat;
  },

  // Delete a user-boat association by user boat id
  async deleteUserBoat(userBoatId: string): Promise<void> {
    const response = await api.delete(`/user-boats/${userBoatId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
  }
};
