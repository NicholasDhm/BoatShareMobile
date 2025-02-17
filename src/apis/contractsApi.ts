import { Contract } from '../@types/contract';
import { api } from './api';

export const contractsApi = {
  // Create a new contract
  async createAdminContract(userId: string, boatId: string, standardQuota: number, substitutionQuota: number): Promise<Contract> {
    const response = await api.post('/contracts/admin', {
      userId,
      boatId,
      standardQuota: standardQuota,
      substitutionQuota: substitutionQuota,
    });
    if (response.status !== 201) {
      throw new Error(response.data.message);
    }
    return response.data;
  },

  async createMemberContract(userId: string, boatId: string): Promise<Contract> {
    const response = await api.post('/contracts/member', {
      userId,
      boatId,
    });
    if (response.status!== 201) {
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
  },

  async getContractByBoatAndUserId(boatId: string, userId: string): Promise<Contract> {
    const response = await api.get(`/contracts/get-by-boat-and-user/${boatId}/${userId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.contract;
  }
};
