import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

const LiveScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // WebSocket bağlantısını başlat
    const socket = new WebSocket('ws://192.168.0.104:3000');

    socket.onopen = () => {
      console.log('WebSocket bağlantısı kuruldu.');
    };

    socket.onmessage = (event) => {
      // Mesajları listeye ekle
      setMessages((prev) => [
        ...prev,
        { id: generateUniqueId(), text: event.data }, // Benzersiz ID
      ]);
    };

    socket.onclose = () => {
      console.log('WebSocket bağlantısı kapatıldı.');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && input.trim()) {
      ws.send(input);
      setMessages((prev) => [
        ...prev,
        { id: generateUniqueId(), text: `Me: ${input}` }, // Benzersiz ID
      ]);
      setInput('');
    }
  };

  // Benzersiz ID oluşturma fonksiyonu
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
        keyExtractor={(item) => item.id}
        estimatedItemSize={50} // Performans için tahmini öğe boyutu
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Mesaj yazın"
        />
        <Button title="Gönder" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  message: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default LiveScreen;
