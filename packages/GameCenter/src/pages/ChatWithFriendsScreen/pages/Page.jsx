import React from 'react';
import { StyleSheet, View ,FlatList, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { useFriends } from '../context/FriendsContext';
import { Text, List } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import LoadingIndicator from '../../../components/LoadingIndicator';
import Header from '../components/Header/Header';
import EmptyState from '../../../components/EmptyState';
const Page = () => {
  const { friends, loading } = useFriends();
  const navigation = useNavigation(); // Initialize navigation

  const renderItem = ({ item }) => (
    <TouchableOpacity // Wrap List.Item with TouchableOpacity
      onPress={() => navigation.navigate('ChatScreen', { friend: item })} // Navigate to ChatScreen and pass friend data
    >
      <List.Item
        title={item.username}
        left={() => (
          <View style={styles.avatarContainer}>
            {item.profilePhoto ? (
              <FastImage
                style={styles.avatar}
                source={{
                  uri: item.profilePhoto,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]} />
            )}
          </View>
        )}
        style={styles.friendItem}
        titleStyle={styles.friendUsername}
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      {friends.length > 0 ? (
        <List.Section>
          <FlatList
            data={friends}
            renderItem={renderItem}
            keyExtractor={(item) => item.id ? item.id.toString() : item.username}
          />
        </List.Section>
      ) : (
        <View style={styles.noFriendsContainer}>
          <EmptyState message="You don't have any friend"/>
        </View>
      )}
    </View>
  );
}

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  friendItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    marginBottom: 2,
    borderRadius: 4,
  },
  friendUsername: {
    fontSize: 24,
    fontFamily: 'Orbitron-ExtraBold',
  },
  noFriendsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFriendsText: {
    fontSize: 18,
    color: '#777',
  },
  avatarContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: '#ddd',
  },
});