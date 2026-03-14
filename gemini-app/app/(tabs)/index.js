import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { askGemini } from "../../services/geminiService";

export default function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    const reply = await askGemini(input);

    const aiMessage = { role: "ai", text: reply };

    setMessages((prev) => [...prev, aiMessage]);
  };

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>🤖 Gemini AI Chat</Text>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={
              item.role === "user"
                ? styles.userBubble
                : styles.aiBubble
            }
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Ask Gemini something..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  messageText: {
    color: "#fff"
  },

  inputContainer: {
    flexDirection: "row",
    marginTop: 10
  },

  input: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    borderRadius: 10
  },

  button: {
    backgroundColor: "#FFD700",
    padding: 12,
    marginLeft: 10,
    borderRadius: 10
  },

  buttonText: {
    fontWeight: "bold"
  }

});