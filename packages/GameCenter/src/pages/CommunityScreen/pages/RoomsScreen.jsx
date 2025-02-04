import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, FAB, Text } from 'react-native-paper';
import RoomList from '../components/RoomList';
import { getRooms, joinRoom, deleteRoom, becomeSupporter, leaveSupporter } from '../services/api';
import { useNavigation } from '@react-navigation/native';


const RoomsScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRooms();
  }, []);


  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      setError(err.message || "Odaları yüklerken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };


  const handleJoinRoom = async (roomId) => {
    try{
        await joinRoom(roomId);
        fetchRooms()
      } catch (err){
        setError(err.message || "Odaya katılırken bir hata oluştu");
    }
  }


  const handleDeleteRoom = async (roomId) => {
      try{
          await deleteRoom(roomId);
          fetchRooms();
      }
      catch (err){
        setError(err.message || "Odayı silerken bir hata oluştu");
    }
  }

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
        try {
            await leaveSupporter(roomId)
            fetchRooms()
        } catch (err) {
            setError(err.message || 'Supporterlıktan çıkarken hata oluştu')
        }
    }

  if(loading){
        return <View style={styles.loadingContainer}>
            <ActivityIndicator size="large"/>
        </View>
    }

    if(error){
        return <View style={styles.errorContainer}>
            <Text>Hata : {error}</Text>
            <Button onPress={fetchRooms}>Tekrar Dene</Button>
        </View>
    }


  return (
    <View style={styles.container}>
      <RoomList
        rooms={rooms}
        onJoin={handleJoinRoom}
        onDelete={handleDeleteRoom}
        onBecomeSupporter={handleBecomeSupporter}
        onLeaveSupporter={handleLeaveSupporter}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateRoom')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f0f0f0',
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

export default RoomsScreen;