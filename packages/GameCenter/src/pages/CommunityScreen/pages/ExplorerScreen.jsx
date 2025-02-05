import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import RoomList from '../components/Rooms/RoomList';
import {   becomeSupporter, leaveSupporter,getOthersRoom } from '../services/api';
import CommunityTopics from '../components/Buttons/CommunityTopics';
import EmptyState from '../../../components/EmptyState';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { ExplorerLoadingSkeleton } from '../components/Loading/ExplorerLoadingScreen';

const ExplorerScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const minimumLoadingTime = 1000;
  const loadingStartTime = useRef(null);


  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    loadingStartTime.current = Date.now(); // Record start time

    try {
      const data = await getOthersRoom();
      setRooms(data);
    } catch (err) {
      setError(err.message || "Odaları yüklerken bir hata oluştu");
    } finally {
      const elapsedTime = Date.now() - loadingStartTime.current;
      const delay = Math.max(0, minimumLoadingTime - elapsedTime);

      setTimeout(() => {
        setLoading(false);
      }, delay);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchRooms();
      return () => {
      };
    }, [fetchRooms])
  );


    const handleBecomeSupporter = async (roomId) => {
        try{
           await becomeSupporter(roomId);
           fetchRooms()
        }
        catch (err){
            setError(err.message || "Supporter olurken hata oluştu");
        }
    }


    const handleLeaveSupporter = async (roomId) => {
        try{
           await leaveSupporter(roomId);
           fetchRooms()
        }
        catch (err){
            setError(err.message || "Supporter ayrılırken hata oluştu");
        }
    }

    const handleJoinRoom = () => {
        // Join room logic can be added here if needed in ExplorerScreen
        console.log("Join room in ExplorerScreen is not implemented yet.");
    };

    const handleDeleteRoom = () => {
        // Delete room logic is not relevant in ExplorerScreen, but placeholder if props are passed
        console.log("Delete room in ExplorerScreen is not implemented and not relevant.");
    };


    return (
      <View style={styles.container}>
        <View style={styles.communityTopicsWrapper}>
          <CommunityTopics />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ExplorerLoadingSkeleton />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <EmptyState />
          </View>
        ) : (
          <RoomList
            rooms={rooms}
            onJoin={handleJoinRoom}
            onDelete={handleDeleteRoom}
            onBecomeSupporter={handleBecomeSupporter}
            onLeaveSupporter={handleLeaveSupporter}
          />
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f0f0f0',

  },

  communityTopicsWrapper: {
  marginVertical:10,
    padding: 0 // iç boşlukları kaldır
},

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorContainer: {
        flex:1,
        justifyContent: "center",
        alignItems: 'center'
    }
});

export default ExplorerScreen;