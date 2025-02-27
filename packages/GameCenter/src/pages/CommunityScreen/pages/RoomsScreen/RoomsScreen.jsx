// RoomsScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { meJoinedRooms } from '../../services/api';
import VideoPlayItems from '../../../HomeScreen/components/VideoPlayBlock/components/VideoPlayItems';
import { RoomLoading } from '../../components/Loading/RoomsScreenloading';
import Message from './components/Message';
import GradientDivider from '../../../../components/GradientDivider';
import ErrorComponents from '../../../../components/ErrorComponents';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const RoomsScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  // useCallback is used to memoize fetchRooms function.
  // This is a good practice for functions used in dependency arrays of useEffect/useFocusEffect
  const fetchRooms = useCallback(async () => {
    setLoading(true); // Set loading to true when fetch starts
    setError(null); // Reset error state at the beginning of fetch
    try {
      const data = await meJoinedRooms();
      setRooms(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch rooms');
      setLoading(false);
    }
  }, []); // Dependency array is empty as fetchRooms doesn't depend on any props or state

  // useFocusEffect from @react-navigation/native is used to trigger the API call
  // whenever the screen comes into focus. This ensures data is refreshed when the user navigates back to this screen.
  useFocusEffect(
    useCallback(() => {
      fetchRooms(); // Call fetchRooms when the screen is focused
      // Optionally, return a cleanup function if needed.
      // In this case, no specific cleanup is required when the screen loses focus.
      return () => {
        // Component is unfocused, any cleanup logic can be placed here if needed.
      };
    }, [fetchRooms]) // Dependency array includes fetchRooms because the effect depends on it.
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
      <View style={{paddingTop: 80,paddingLeft:45}}>
        <VideoPlayItems
              title="Join a room to start chatting"
              imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKni1sjgvtL6sHuH9nyUJhk7Y_Przzh1-iRQ&s"
              resizeMode="contain"
            />

        </View>
        <View>
        <Message />
        </View>
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
        fadingEdgeLength={50} // fadingEdgeLength is correctly placed here to add fade effect at the edges of horizontal scroll.
      >
        {rooms.map((room, index) => (
          <View key={room.id} style={styles.roomItem}>
            <VideoPlayItems
              title={room.name}
              imageUri={room.imageUrl}
              index={index}
              resizeMode="contain"
              onPress={() => navigation.navigate('RoomChatScreen', { roomId: room.id, roomName: room.name , roomTopic:room.topic })} // Navigate on press
            />
         <GradientDivider colors={['#6610F2', '#EA047E']} horizontalMargin={'%10'} height={1} />
          </View>

        ))}
      </ScrollView>
      <Message />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
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
    color: 'red',
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
    color: 'gray',
  },
  emptyRoomsContainer: {
    flex: 1, // Take up the available space
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    paddingTop: 20,         // Add some top padding to separate from header if needed
  },
  emptyRoomsText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default RoomsScreen;