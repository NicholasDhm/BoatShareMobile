import { Contract } from '../@types/contract';
import { api } from './api';

export const contractsApi = {
  // Create a new contract
  async createContract(userId: string, boatId: string): Promise<Contract> {
    const response = await api.post('/contracts', {
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

  // Fetch all contracts
  async getContracts(): Promise<Contract[]> {
    const response = await api.get('/contracts');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.contracts;
  },

  // Fetch contracts by user ID
  async getContractsByUserId(userId: string): Promise<Contract[]> {
    const response = await api.get(`/contracts/get-by-user/${userId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.contracts;
  },

  // Fetch contracts by boat ID
  async getContractsByBoatId(boatId: string): Promise<Contract[]> {
    const response = await api.get(`/contracts/get-by-boat/${boatId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.contracts;
  },

  // Get a contract by contract id
  async getContractById(contractId: string): Promise<Contract> {
    const response = await api.get(`/contracts/${contractId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.contract;
  },

  // Delete a contract by contract id
  async deleteContract(contractId: string): Promise<void> {
    const response = await api.delete(`/contracts/${contractId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
  }
};
