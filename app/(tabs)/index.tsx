import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, useColorScheme } from "react-native";
import Colors from '@/constants/Colors';
import { getData } from '@/constants/storage';
interface GitHubCommitterProps { }


const GitHubCommitter: React.FC<GitHubCommitterProps> = () => {
  const [token, setToken] = useState<string>("");
  const [repo, setRepo] = useState<string>("auto-commit");
  const [owner, setOwner] = useState<string>("trandat1114");
  const [filePath, setFilePath] = useState<string>("README.md");
  const [content, setContent] = useState<string>("TEST AUTO COMMIT FROM REACT NATIVE ❤❤❤");
  const [message, setMessage] = useState<string>("Auto commit from React Native");
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
      borderColor: Colors[colorScheme ?? 'light'].text,
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
    if (!token || !repo || !owner || !filePath) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const encodedContent = btoa(unescape(encodeURIComponent(content)));
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `token ${token}` },
      });
      const data = await response.json();
      const sha = data.sha;

      const commitResponse = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          content: encodedContent,
          sha: sha,
        }),
      });

      if (commitResponse.ok) {
        Alert.alert("Thành công", "Commit đã được gửi lên GitHub!");
      } else {
        Alert.alert("Lỗi", "Không thể commit!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tự động Commit GitHub</Text>
      <TextInput style={styles.input}
        placeholderTextColor={'gray'}
        placeholder="GitHub Username"
        value={owner}
        onChangeText={setOwner} />
      <TextInput style={styles.input}
        placeholderTextColor={'gray'}
        placeholder="Repository Name"
        value={repo}
        onChangeText={setRepo} />
      <TextInput style={styles.input}
        placeholderTextColor={'gray'}
        placeholder="File Path"
        value={filePath}
        onChangeText={setFilePath} />
      <TextInput style={styles.input}
        placeholderTextColor={'gray'}
        placeholder="Nội dung file"
        value={content}
        onChangeText={setContent}
        multiline />
      <TextInput style={styles.input}
        placeholder="Commit Message"
        value={message}
        onChangeText={setMessage} />
      <Button title="Commit to GitHub" onPress={handleCommit} />
    </View>
  );
};



export default GitHubCommitter;
