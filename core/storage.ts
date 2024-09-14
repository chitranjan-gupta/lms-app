import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function getItem<T>(key: string): Promise<T> {
  if (Platform.OS === "web") {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } else {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  }
}

export async function setItem<T>(key: string, value: T) {
  if (Platform.OS === "web") {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } else {
    return await SecureStore.setItemAsync(key, JSON.stringify(value));
  }
}

export async function removeItem(key: string) {
  if (Platform.OS === "web") {
    return await AsyncStorage.removeItem(key);
  } else {
    return await SecureStore.deleteItemAsync(key);
  }
}
