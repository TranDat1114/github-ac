import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu dữ liệu
export const saveData = async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

// Lấy dữ liệu
export const getData = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

// Xóa dữ liệu
export const removeData = async (key: string) => {
    await AsyncStorage.removeItem(key);
};
