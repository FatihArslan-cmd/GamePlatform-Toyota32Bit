// screens/ChatScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Message from './Message';
import { useWebSocket } from './webSocketManager';
import { getToken } from '../../shared/states/api';

const ChatScreen = ({ route }) => {
    const insets = useSafeAreaInsets();
   const { topicId, topicName } = route.params;
   const [messageText, setMessageText] = useState('');
   const [messages, setMessages] = useState([]);
    const { sendMessage, messageQueue } = useWebSocket('ws://10.0.2.2:3000');
 
 
     useEffect(() => {
           if(topicId){
               sendMessage({type: 'joinTopic', topicId: topicId});
           }
       }, [topicId, sendMessage]);
 
     useEffect(() => {
           if (messageQueue && messageQueue.length > 0) {
             const parsedMessage = messageQueue[0];
             if(parsedMessage.type === 'message' && parsedMessage.topicId === topicId)
               setMessages((prev) => [...prev, parsedMessage]);
             messageQueue.shift();
           }
        }, [messageQueue, topicId]);
 
   const handleSendMessage = useCallback(() => {
     if (messageText.trim() !== '') {
       sendMessage({ type: 'message', topicId: topicId, content: messageText });
       setMessageText('');
      }
   },[messageText, topicId, sendMessage]);
 
   return (
       <View style={[styles.container, { paddingTop: insets.top }]}>
         <Text style={styles.topicName}>Topic: {topicName}</Text>
         <FlatList
           data={messages}
           renderItem={({ item }) => <Message message={item} />}
          keyExtractor={(item, index) => index.toString()}
         />
         <View style={styles.inputContainer}>
             <TextInput
               style={styles.input}
                 placeholder="Enter message"
              value={messageText}
              onChangeText={setMessageText}
             />
             <Button title="Send" onPress={handleSendMessage} />
        </View>
      </View>
   );
 };
 
 const styles = StyleSheet.create({
    container: {
         flex: 1,
         paddingHorizontal: 20,
     },
     topicName: {
         fontSize: 20,
         fontWeight: 'bold',
         textAlign: 'center',
       marginVertical: 10,
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
         padding: 10,
        marginRight: 10,
     },
 });
 
 export default ChatScreen;