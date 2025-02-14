import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_BOAT_STORAGE } from "./storageConfig";
import { UserBoat } from "../@types/user-boat";


export async function storageUserBoatSave(userBoat: UserBoat) {
  const storage = await AsyncStorage.getItem(USER_BOAT_STORAGE);
  const userBoats: UserBoat[] = storage ? JSON.parse(storage) : [];
  userBoats.push(userBoat);
  await AsyncStorage.setItem(USER_BOAT_STORAGE, JSON.stringify(userBoats));
}

export async function storageUserBoatSaveMany(userBoats: UserBoat[]) {
  await AsyncStorage.setItem(USER_BOAT_STORAGE, JSON.stringify(userBoats));
}

export async function storageUserBoatGet() {
  const storage = await AsyncStorage.getItem(USER_BOAT_STORAGE);

  const userBoats: UserBoat[] = storage ? JSON.parse(storage) : [];

  return userBoats;
}

export async function storageUserBoatRemove() {
  await AsyncStorage.removeItem(USER_BOAT_STORAGE);
}
