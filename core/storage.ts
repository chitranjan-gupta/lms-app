import * as SecureStore from "expo-secure-store";

export async function getItem<T>(key: string): Promise<T> {
  const value = await SecureStore.getItemAsync(key);
  return value ? JSON.parse(value) : null;
}

export async function setItem<T>(key: string, value: T) {
  return await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  return await SecureStore.deleteItemAsync(key);
}
