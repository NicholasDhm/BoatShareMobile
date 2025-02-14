import AsyncStorage from "@react-native-async-storage/async-storage";
import { Boat } from "../@types/boat";
import { BOAT_STORAGE } from "./storageConfig";

export async function storageBoatSave(boat: Boat) {
  const storage = await AsyncStorage.getItem(BOAT_STORAGE);
  const boats: Boat[] = storage ? JSON.parse(storage) : [];
  boats.push(boat);
  await AsyncStorage.setItem(BOAT_STORAGE, JSON.stringify(boats));
}

export async function storageBoatSaveMany(boats: Boat[]) {
  await AsyncStorage.setItem(BOAT_STORAGE, JSON.stringify(boats));
}

export async function storageBoatGet() {
  const storage = await AsyncStorage.getItem(BOAT_STORAGE);
  const boats: Boat[] = storage ? JSON.parse(storage) : [];
  return boats;
}

export async function storageBoatRemove() {
  await AsyncStorage.removeItem(BOAT_STORAGE);
}
