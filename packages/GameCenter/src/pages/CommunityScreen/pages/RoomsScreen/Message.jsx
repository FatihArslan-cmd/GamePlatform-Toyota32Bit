import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import MessageItem from './MessageItem';
import { getMessagesFromApi } from '../../services/postMessageApi';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import EmptyState from '../../../../components/EmptyState';
import ErrorComponents from '../../../../components/ErrorComponents';
import { ExplorerLoadingSkeleton } from '../../components/Loading/ExplorerLoadingScreen';

const Message = ({ onScroll, listRef }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadingTimer = useRef(null); // useRef ile timer'ı saklayın

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    clearTimeout(loadingTimer.current); // Önceki timer varsa temizle

    const startTime = Date.now(); // Başlangıç zamanını kaydet

    try {
      const data = await getMessagesFromApi();
      setMessages(data);
      const endTime = Date.now(); // Bitiş zamanını kaydet
      const elapsedTime = endTime - startTime; // Geçen süreyi hesapla
      const remainingTime = Math.max(0, 1000 - elapsedTime); // Minimum 1 saniye bekleme için kalan süreyi hesapla

      loadingTimer.current = setTimeout(() => { // setTimeout ile minimum 1 saniye bekle
        setLoading(false);
      }, remainingTime);

    } catch (err) {
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);

      setError(err.message || 'Failed to fetch messages');
      loadingTimer.current = setTimeout(() => { // Hata durumunda da minimum 1 saniye bekle
        setLoading(false);
      }, remainingTime);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    return () => clearTimeout(loadingTimer.current); // Temizleme fonksiyonu ekle
  }, [fetchMessages]);

  useFocusEffect(
    useCallback(() => {
      fetchMessages();
      return () => clearTimeout(loadingTimer.current); // FocusEffect için de temizleme fonksiyonu
    }, [fetchMessages])
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ExplorerLoadingSkeleton></ExplorerLoadingSkeleton>
      ) : messages.length > 0 ? (
        <FlashList
          ref={listRef}
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} />}
          estimatedItemSize={100}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      ) : (
        !loading && !error && (
          <View style={styles.emptyContainer}>
            <EmptyState></EmptyState>
          </View>
        )
      )}
       {error && <ErrorComponents errorMessage={error}></ErrorComponents>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginTop: 200,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Message;