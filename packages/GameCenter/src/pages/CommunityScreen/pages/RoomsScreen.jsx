import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomFAB from '../components/Buttons/CustomFab';
import { meJoinedRooms } from '../services/api';
import VideoPlayItems from '../../HomeScreen/components/VideoPlayBlock/VideoPlayItems';

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
        <Text>Loading rooms...</Text>
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
        <></>
      )}
      <CustomFAB />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },

  scrollView: {
    flexGrow: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  roomItem: {
    marginHorizontal: 16, // Itemler arası boşluk artırıldı
    marginBottom: 20,
    marginTop: 20,
  },
});

export default RoomsScreen;