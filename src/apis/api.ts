import axios from "axios";

export const api = axios.create({
  baseURL: 'http://192.168.0.119:3333', // Nick 2 ip
  // baseURL: 'http://192.168.1.12:3333', // Nick 1 ip
  timeout: 5000,
});
