import React from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Import Text
import { Card } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import formatDate from '../../../../utils/FormatDate';


const RoomCard = ({ room }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <FastImage
          source={{ uri: room.imageUrl, priority: FastImage.priority.high }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{room.name}</Text>
            <Text style={styles.date}>{formatDate(room.createdAt)}</Text>
          </View>
          
          <Text style={styles.topic}>{room.topic}</Text>

          <View style={styles.footer}>
            <View style={styles.supporterContainer}>
              <Text style={styles.supporters}>
                {room.supporterCount} supporters
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 4,
    backgroundColor: '#ffffff',
  },
  container: {
    flexDirection: 'row',
    height: 140,
  },
  image: {
    width: 140,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4, // Added margin to separate from topic
  },
  title: {
    fontSize: 18,
    fontFamily: 'Orbitron-ExtraBold',
    flex: 1,  // Added flex to push date to the right

  },
  topic: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    height: 35,
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Changed to flex-start
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 12,
    color: '#888888',
  },
  supporterContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  supporters: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 12,
    color: '#444444',
  },
});

export default RoomCard;