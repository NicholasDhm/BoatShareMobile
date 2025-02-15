import { api } from "./api";
import * as Crypto from 'expo-crypto';

export const authApi = {
  async login(email: string, password: string) {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    const response = await api.post('/auth/login', { email, hashedPassword });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
};
