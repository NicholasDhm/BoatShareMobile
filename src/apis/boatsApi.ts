import { Boat } from '../@types/boat';
import { api } from './api';

export const boatsApi = {
  // Fetch all boats
  async getBoats(): Promise<Boat[]> {
    const response = await api.get('/boats');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  },

  // Fetch boat by id
  async getBoatById(id: string): Promise<Boat> {
    const response = await api.get(`/boats/${id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  },

  // Fetch all boats for a specific user
  async getBoatsByUserId(userId: string): Promise<Boat[]> {
    const response = await api.get(`/boats/${userId}/boats`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    console.log(response);
    return response.data;
  },

  // Create a new boat
  async createBoat(name: string, capacity: number): Promise<Boat> {
    const response = await api.post('/boats', { name, capacity });

    if (response.status !== 201) {
      throw new Error(response.data.message);
    }

    return response.data;
  },

  // Delete a boat by id
  async deleteBoat(id: string): Promise<void> {
    const response = await api.delete(`/boats/${id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  }
};