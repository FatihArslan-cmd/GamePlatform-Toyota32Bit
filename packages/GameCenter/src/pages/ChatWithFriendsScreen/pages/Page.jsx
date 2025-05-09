import EmptyState from "../../../components/EmptyState";
import FastImage from "react-native-fast-image";
import Header from "../components/Header/Header";
import LoadingIndicator from "../../../components/LoadingIndicator";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import { List, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../context/ThemeContext";
import { isTablet } from "../../../utils/isTablet";
import { useFriends } from "../context/FriendsContext";

const TABLET_DEVICE = isTablet();

const Page = () => {
  const { friends, loading } = useFriends();
  const navigation = useNavigation(); 
  const { colors } = useTheme(); 
  const { t } = useTranslation();

  const renderItem = ({ item }) => (
    <TouchableRipple 
      onPress={() => navigation.navigate('ChatScreen', { friend: item })} 
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
              <View style={[styles.avatar, styles.avatarPlaceholder, { backgroundColor: colors.border }]} /> 
            )}
          </View>
        )}
        style={[styles.friendItem, { backgroundColor: colors.card }]} 
        titleStyle={[styles.friendUsername, { color: colors.text }]} 
      />
    </TouchableRipple>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <LoadingIndicator/>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
        <View style={[styles.noFriendsContainer, { backgroundColor: colors.background }]}> 
          <EmptyState message={t('chatWithFriends.emptyState')} textColor={colors.text}/>
        </View>
      )}
    </View>
  );
}

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: TABLET_DEVICE ? 24 : 18,
    fontFamily: 'Orbitron-ExtraBold',
    color: 'black', 
  },
  noFriendsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4', 
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
    width: TABLET_DEVICE ? 70 : 50,
    height: TABLET_DEVICE ? 70 : 50,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: '#ddd',
  },
});