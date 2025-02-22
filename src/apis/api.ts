import axios from "axios";

export const api = axios.create({
  baseURL: 'http://192.168.0.119:3333', // Nick 2 ip
  // baseURL: 'http://192.168.1.5:3333', // Nick 1 ip1
  timeout: 5000,
});
