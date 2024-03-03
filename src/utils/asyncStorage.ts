import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageOptions = {
  jsonParse?: boolean;
};

export const getAsyncStorageData = async (
  item: string,
  options: StorageOptions = {},
) => {
  const { jsonParse = false } = options;
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null && jsonParse === true) {
      return JSON.parse(value);
    }
  } catch (e) {}

  return null;
};

export const setAsyncStorageData = async (item: string, value: any) => {
  try {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(item, value);
  } catch (e) {}
};
