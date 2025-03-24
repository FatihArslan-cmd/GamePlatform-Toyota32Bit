import React, { createContext, useState, useCallback, useRef, useContext } from 'react';
import {   getOthersRoom, becomeSupporter } from '../../../services/roomApi';
import { useFocusEffect } from '@react-navigation/native';

export const ExplorerContext = createContext();

export const ExplorerProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const minimumLoadingTime = 1000;
  const loadingStartTime = useRef(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const allButtonTitle = "All";

  const handleTopicSelect = useCallback((topic) => {
    setSelectedTopic(topic);
  }, []);

  const fetchRooms = useCallback(async (topicFilter) => {
    setLoading(true);
    setError(null);
    loadingStartTime.current = Date.now();

    try {
      const data = await getOthersRoom();

      let filteredRooms = data;
      if (topicFilter && topicFilter !== allButtonTitle) {
        filteredRooms = data.filter(room => room.topic === topicFilter);
      } else if (topicFilter === allButtonTitle || topicFilter === null) {
        filteredRooms = data;
      }
      setRooms(filteredRooms);

    } catch (err) {
      setError(err.message || "Odaları yüklerken bir hata oluştu");
    } finally {
      const elapsedTime = Date.now() - loadingStartTime.current;
      const delay = Math.max(0, minimumLoadingTime - elapsedTime);

      setTimeout(() => {
        setLoading(false);
      }, delay);
    }
  }, [allButtonTitle]);

  const handleBecomeSupporter = useCallback(async (roomId) => {
    try{
       await becomeSupporter(roomId);
       fetchRooms(selectedTopic);
    }
    catch (err){
         setError(err.message || "Supporter olurken hata oluştu");
     }
 }, [fetchRooms, selectedTopic]);


  useFocusEffect(
    useCallback(() => {
      fetchRooms(selectedTopic);
      return () => {
      };
    }, [fetchRooms, selectedTopic])
  );

  const contextValue = {
    rooms,
    loading,
    error,
    selectedTopic,
    allButtonTitle,
    setRooms,
    setLoading,
    setError,
    setSelectedTopic,
    handleTopicSelect,
    fetchRooms,
    handleBecomeSupporter,
  };

  return (
    <ExplorerContext.Provider value={contextValue}>
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorer = () => useContext(ExplorerContext);