import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reservation } from "../@types/reservation";
import { RESERVATION_STORAGE } from "./storageConfig";

export async function storageReservationSave(reservation: Reservation) {
  const storage = await AsyncStorage.getItem(RESERVATION_STORAGE);
  const reservations: Reservation[] = storage ? JSON.parse(storage) : [];
  reservations.push(reservation);
  await AsyncStorage.setItem(RESERVATION_STORAGE, JSON.stringify(reservations));
}

export async function storageReservationSaveMany(reservations: Reservation[]) {
  await AsyncStorage.setItem(RESERVATION_STORAGE, JSON.stringify(reservations));
}

export async function storageReservationGet() {
  const storage = await AsyncStorage.getItem(RESERVATION_STORAGE);
  const reservations: Reservation[] = storage ? JSON.parse(storage) : [];
  return reservations;
}

export async function storageReservationRemove() {
  await AsyncStorage.removeItem(RESERVATION_STORAGE);
}
