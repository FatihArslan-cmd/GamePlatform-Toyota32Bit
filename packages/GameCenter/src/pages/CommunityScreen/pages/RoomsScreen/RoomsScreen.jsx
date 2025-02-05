import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { meJoinedRooms } from '../../services/api';
import VideoPlayItems from '../../../HomeScreen/components/VideoPlayBlock/VideoPlayItems';
import { RoomLoading } from '../../components/Loading/RoomsScreenloading';
import Message from './Message';

const RoomsScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await meJoinedRooms();
        setRooms(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch rooms');
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

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
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {rooms.length > 0 ? (
        <ScrollView
          horizontal
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
        >
          {rooms.map((room, index) => (
            <View key={room.id} style={styles.roomItem}>
              <VideoPlayItems
                title={room.name}
                imageUri={room.imageUrl}
                index={index}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        !loading && !error && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No rooms available.</Text>
          </View>
        )
      )}
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
    marginBottom: 20, // Added marginBottom to create space for Message component
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  roomItem: {
    marginHorizontal: 16,
    marginBottom: 20,
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
});

export default RoomsScreen;