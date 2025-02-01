import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopicList from './TopicList';
import { useWebSocket } from './webSocketManager';
import {useFocusEffect} from '@react-navigation/native'
import { getToken } from '../../shared/states/api';
import { useNavigation } from '@react-navigation/native';
const LiveScreen = ({ navigation }) => {

    const insets = useSafeAreaInsets();
    const [topicName, setTopicName] = useState('');
    const [topics, setTopics] = useState([]);
      const { sendMessage, messageQueue } = useWebSocket('ws://10.0.2.2:3000');
      const [accessToken, setAccessToken] = useState('');


    useFocusEffect(
        React.useCallback(() => {
            const fetchTokens = async() =>{
                 const token = await getToken();
                if(token){
                    setAccessToken(token)
                }
             }
            fetchTokens();
        }, [])
    );


    useEffect(() => {
        if (messageQueue && messageQueue.length > 0) {
            const parsedMessage = messageQueue[0];
           if(parsedMessage.type === 'topicCreated'){
             setTopics((prev)=> [...prev, {id: parsedMessage.topicId, name: parsedMessage.topicName}]);
           }
              messageQueue.shift();
           }
      }, [messageQueue]);

      const openScanner = () => {
        navigation.navigate('BarcodeScan');
      };
  const handleCreateTopic = () => {
      sendMessage({type: 'createTopic', topicName: topicName});
    setTopicName('');
  };
   const navigateToChat = (topicId, topicName) =>{
        navigation.navigate('Chat', {topicId:topicId, topicName: topicName});
   }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Topics</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter topic name"
          value={topicName}
          onChangeText={setTopicName}
        />
        <Button title="Create" onPress={handleCreateTopic} />
      </View>
      <Button title="Barkod Tara" onPress={openScanner} />

     <TopicList topics={topics} onTopicPress={navigateToChat}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
});

export default LiveScreen;