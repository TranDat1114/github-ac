import { Alert, Button, StyleSheet, TextInput, useColorScheme } from 'react-native';

import { View } from '@/components/Themed';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useEffect, useState } from 'react';
import { getData, saveData } from '@/constants/storage';

export default function TabTwoScreen() {
  const [token, setToken] = useState<string>("");
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      color: Colors[colorScheme ?? 'light'].text,
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getData("github_token");
      if (storedUser) {
        setToken(storedUser);
      }
    }
    fetchUser();
  }, []);

  const handleCommit = async (): Promise<void> => {
    if (!token) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    } else {
      saveData("github_token", token);
      Alert.alert("Thành công", "Lưu token thành công!");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        placeholderTextColor={'gray'}
        placeholder="GitHub Token"
        value={token}
        onChangeText={setToken} />
      <Button title="Commit to GitHub" onPress={handleCommit} />
    </View>
  );
}