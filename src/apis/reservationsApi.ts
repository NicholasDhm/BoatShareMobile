import axios from 'axios';
import { Reservation } from '../types/reservation';

const apiUrl = 'http://localhost:3000'; // Replace with your backend API URL

class ReservationsAPI {
  // Fetch all reservations
  static async getAllReservations(): Promise<Reservation[]> {
    const response = await axios.get(`${apiUrl}/reservations`);
    return response.data.reservations;
  }

  // Fetch reservation by reservation id
  static async getReservationById(id: string): Promise<Reservation> {
    const response = await axios.get(`${apiUrl}/reservations/${id}`);
    return response.data.reservation;
  }

  // Fetch all active reservations (non-legacy)
  static async getActiveReservations(): Promise<Reservation[]> {
    const response = await axios.get(`${apiUrl}/reservations/active`);
    return response.data.activeReservations;
  }

  // Fetch all legacy reservations
  static async getLegacyReservations(): Promise<Reservation[]> {
    const response = await axios.get(`${apiUrl}/reservations/legacy`);
    return response.data.legacyReservations;
  }

  // Fetch all reservations by user id
  static async getReservationsByUserId(userId: string): Promise<Reservation[]> {
    const response = await axios.get(`${apiUrl}/reservations/user/${userId}`);
    return response.data.reservations;
  }

  // Fetch all reservations by boat id
  static async getReservationsByBoatId(boatId: string): Promise<Reservation[]> {
    const response = await axios.get(`${apiUrl}/reservations/boat/${boatId}`);
    return response.data.reservations;
  }

  // Post a new reservation
  static async createReservation(reservation: Omit<Reservation, 'reservationId'>): Promise<void> {
    await axios.post(`${apiUrl}/reservations`, reservation);
  }
  // Delete reservation by reservation id
  static async deleteReservation(id: string): Promise<void> {
    await axios.delete(`${apiUrl}/reservations/${id}`);
  }

  // Update reservation status to 'Legacy' for all reservations where the date has passed
  static async updateLegacyStatus(): Promise<void> {
    await axios.put(`${apiUrl}/reservations/updateLegacyStatus`);
  }

  // Update reservation status from 'Pending' to 'Unconfirmed'
  static async updatePendingToUnconfirmed(id: string): Promise<void> {
    await axios.put(`${apiUrl}/reservations/${id}/pendingToUnconfirmed`);
  }

  // Update reservation status from 'Unconfirmed' to 'Confirmed'
  static async updateUnconfirmedToConfirmed(id: string): Promise<void> {
    await axios.put(`${apiUrl}/reservations/${id}/unconfirmedToConfirmed`);
  }
}

export default ReservationsAPI;
