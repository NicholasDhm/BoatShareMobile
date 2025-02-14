import { Reservation } from '../@types/reservation';
import { api } from './api';

export const reservationsApi = {
  // Fetch all reservations
  async getAllReservations(): Promise<Reservation[]> {
    const response = await api.get('/reservations');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.reservations;
  },

  // Fetch reservation by reservation id
  async getReservationById(id: string): Promise<Reservation> {
    const response = await api.get(`/reservations/${id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.reservation;
  },

  // Fetch all active reservations (non-legacy)
  async getActiveReservations(): Promise<Reservation[]> {
    const response = await api.get('/reservations/active');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.activeReservations;
  },

  // Fetch all legacy reservations
  async getLegacyReservations(): Promise<Reservation[]> {
    const response = await api.get('/reservations/legacy');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.legacyReservations;
  },

  // Fetch all reservations by user id
  async getReservationsByUserId(userId: string): Promise<Reservation[]> {
    const response = await api.get(`/reservations/user/${userId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.reservations;
  },

  // Fetch all reservations by boat id
  async getReservationsByBoatId(boatId: string): Promise<Reservation[]> {
    const response = await api.get(`/reservations/boat/${boatId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.reservations;
  },

  // Post a new reservation
  async createReservation(reservation: Omit<Reservation, 'reservationId'>): Promise<void> {
    const response = await api.post('/reservations', reservation);
    if (response.status !== 201) {
      throw new Error(response.data.message);
    }
  },

  // Delete reservation by reservation id
  async deleteReservation(id: string): Promise<void> {
    const response = await api.delete(`/reservations/${id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
  },

  // Update reservation status
  async updateReservationStatus(id: string, status: string): Promise<void> {
    const response = await api.put(`/reservations/${id}/status`, { status });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
  }
};
