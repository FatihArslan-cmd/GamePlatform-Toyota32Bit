import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { meJoinedRooms } from '../../services/roomApi';
import VideoPlayItems from '../../../HomeScreen/components/VideoPlayBlock/components/VideoPlayItems';
import { RoomLoading } from '../../components/Loading/RoomsScreenloading';
import Message from './components/Message';
import GradientDivider from '../../../../components/GradientDivider';
import ErrorComponents from '../../../../components/ErrorComponents';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../context/ThemeContext'; 

const RoomsScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { colors } = useTheme(); 
  const styles = createStyles(colors);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await meJoinedRooms();
      setRooms(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch rooms');
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRooms();
      return () => {
      };
    }, [fetchRooms])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <RoomLoading />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorComponents  errorMessage={error} />
      </View>
    );
  }

  if (rooms.length === 0) {
    return (
      <>
      <View style={[styles.emptyRoomsContainer, {paddingTop: 80,paddingLeft:45}]}>
        <VideoPlayItems
              title="Join a room to start chatting"
              imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKni1sjgvtL6sHuH9nyUJhk7Y_Przzh1-iRQ&s"
              resizeMode="contain"
            />
        </View>
        <Message />
        </>
    );
  }


  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        fadingEdgeLength={50}
      >
        {rooms.map((room, index) => (
          <View key={room.id} style={styles.roomItem}>
            <VideoPlayItems
              title={room.name}
              imageUri={room.imageUrl}
              index={index}
              resizeMode="contain"
              onPress={() => navigation.navigate('RoomChatScreen', { roomId: room.id, roomName: room.name , roomTopic:room.topic })}
            />
         <GradientDivider colors={['#6610F2', '#EA047E']} horizontalMargin={'%10'} height={1} />
          </View>

        ))}
      </ScrollView>
      <Message />
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({ 
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: colors.background, 
  },
  scrollView: {
    flexGrow: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  roomItem: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  errorText: {
    color: colors.error, 
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.subText, 
  },
  emptyRoomsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  emptyRoomsText: {
    fontSize: 18,
    color: colors.subText, 
  },
});

export default RoomsScreen;