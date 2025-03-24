import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import MessageItem from './MessageItem';
import { getMessagesFromApi } from '../../../services/postMessageApi';
import { useFocusEffect } from '@react-navigation/native';
import EmptyState from '../../../../../components/EmptyState';
import ErrorComponents from '../../../../../components/ErrorComponents';
import { ExplorerLoadingSkeleton } from '../../ExplorerScreen/components/ExplorerLoadingScreen';
import { useTheme } from '../../../../../context/ThemeContext'; 

const Message = ({ onScroll, listRef }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadingTimer = useRef(null);
  const { colors } = useTheme(); 
  const styles = createStyles(colors); 

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    clearTimeout(loadingTimer.current);

    const startTime = Date.now();

    try {
      const data = await getMessagesFromApi();
      setMessages(data);
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);

      loadingTimer.current = setTimeout(() => {
        setLoading(false);
      }, remainingTime);

    } catch (err) {
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);

      setError(err.message || 'Failed to fetch messages');
      loadingTimer.current = setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    return () => clearTimeout(loadingTimer.current);
  }, [fetchMessages]);

  useFocusEffect(
    useCallback(() => {
      fetchMessages();
      return () => clearTimeout(loadingTimer.current);
    }, [fetchMessages])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
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

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 200,
  },
  emptyText: {
    fontSize: 16,
    color: colors.subText, 
  },
});


export default Message;