import { User } from '../@types/user';
import { api } from './api';
import * as Crypto from 'expo-crypto';

export const usersApi = {
  // Fetch all users
  async getUsers(): Promise<User[]> {
    const response = await api.get('/users');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.users;
  },

  // Fetch user by id
  async getUserById(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.user;
  },

  // Create a new user
  async createUser(name: string, email: string, password: string): Promise<User> {
    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    console.log(passwordHash);
    const response = await api.post('/users', { name, email, passwordHash });
    if (response.status !== 201) {
      throw new Error(response.data.message);
    }
    return response.data;
  },

  // Delete a user by id
  async deleteUser(id: string): Promise<void> {
    const response = await api.delete(`/users/${id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  },

  async getUserByEmail(email: string): Promise<User> {
    const response = await api.get(`/users/email/${email}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.user;
  }
};
