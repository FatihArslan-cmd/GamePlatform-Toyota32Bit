import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import RoomList from '../../components/Rooms/RoomList';
import {   becomeSupporter,getOthersRoom } from '../../services/api';
import CommunityTopics from '../../components/Buttons/CommunityTopics';
import EmptyState from '../../../../components/EmptyState';
import { useFocusEffect } from '@react-navigation/native';
import { ExplorerLoadingSkeleton } from '../../components/Loading/ExplorerLoadingScreen';

const ExplorerScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const minimumLoadingTime = 1000;
  const loadingStartTime = useRef(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const allButtonTitle = "All";

  const handleTopicSelect = useCallback((topic) => {
    console.log("ExplorerScreen: Selected topic:", topic);
    setSelectedTopic(topic);
  }, []);


  const fetchRooms = useCallback(async (topicFilter) => {
    console.log("fetchRooms fonksiyonu başladı, topicFilter:", topicFilter);
    setLoading(true);
    setError(null);
    loadingStartTime.current = Date.now();

    try {
      const data = await getOthersRoom();
      console.log("getOthersRoom API çağrısı başarılı, veri:", data);

      let filteredRooms = data;
      if (topicFilter && topicFilter !== allButtonTitle) {
        filteredRooms = data.filter(room => room.topic === topicFilter);
        console.log("Odalar topic'e göre filtrelendi:", topicFilter, filteredRooms);
      } else if (topicFilter === allButtonTitle || topicFilter === null) {
        filteredRooms = data;
        console.log("Tüm odalar gösteriliyor (All seçildi veya topic filtresi yok)");
      } else {
        console.log("Tüm odalar gösteriliyor (topic filtresi yok)");
      }
      setRooms(filteredRooms);


    } catch (err) {
      console.error("fetchRooms hatası:", err);
      setError(err.message || "Odaları yüklerken bir hata oluştu");
    } finally {
      const elapsedTime = Date.now() - loadingStartTime.current;
      const delay = Math.max(0, minimumLoadingTime - elapsedTime);

      setTimeout(() => {
        setLoading(false);
        console.log("fetchRooms fonksiyonu tamamlandı, loading false yapıldı");
      }, delay);
    }
  }, [allButtonTitle]);

  useFocusEffect(
    useCallback(() => {
      fetchRooms(selectedTopic);
      return () => {
      };
    }, [fetchRooms, selectedTopic])
  );


    const handleBecomeSupporter = async (roomId) => {
        console.log("handleBecomeSupporter fonksiyonu çağrıldı, roomId:", roomId);
        try{
           await becomeSupporter(roomId);
           console.log("becomeSupporter API çağrısı başarılı");
           fetchRooms(selectedTopic);
           console.log("fetchRooms fonksiyonu çağrıldı (supporter sonrası)");
        }
        catch (err){
             console.error("handleBecomeSupporter hatası:", err);
             setError(err.message || "Supporter olurken hata oluştu");
         }
     }



    return (
      <View style={styles.container}>
        <View style={styles.communityTopicsWrapper}>
          <CommunityTopics onTopicSelect={handleTopicSelect} selectedTopic={selectedTopic} showAllButton={true} />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ExplorerLoadingSkeleton />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <EmptyState message="No Community" />
          </View>
        ) : (
          <RoomList
            rooms={rooms}
            onBecomeSupporter={handleBecomeSupporter}
          />
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: 'white',

  },

  communityTopicsWrapper: {
  marginVertical:10,
    padding: 0
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