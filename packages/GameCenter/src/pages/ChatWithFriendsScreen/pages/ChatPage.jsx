import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatProvider } from '../context/ChatContext'; // Yolu ayarlayın
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import InputArea from '../components/InputArea';
import { useTheme } from '../../../context/ThemeContext';

const ChatScreen = () => {
  const route = useRoute();
  const { friend: initialFriend } = route.params;
  const messageListRef = useRef(null);
  const { colors } = useTheme();

  return (
    <ChatProvider initialFriend={initialFriend}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <ChatHeader />
          <MessageList messageListRef={messageListRef} />
          <InputArea />
        </View>
      </SafeAreaView>
    </ChatProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default ChatScreen;