import React, { useCallback, useState } from "react";
import lobbyService from "./services/lobbyService";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useTheme } from "../../../../context/ThemeContext";
import { isTablet } from "../../../../utils/isTablet";
import { useHeader } from "./context/HeaderContext";

const TABLET_DEVICE = isTablet(); 

const MessageIconWithBadge = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { colors } = useTheme(); 
  const { navigateToPersonalMessagePage} = useHeader();

  const fetchInvitationCount = useCallback(async () => {
    try {
      const count = await lobbyService.getInvitationCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to fetch invitation count:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchInvitationCount();
      return () => {
      };
    }, [fetchInvitationCount])
  );

  const handlePress = () => {
    navigateToPersonalMessagePage();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <IconButton
        icon="bell-outline"
        iconColor={colors.text}
        size={TABLET_DEVICE ? 24 : 18}
        style={{margin: 0, opacity: 0.8}}
      />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -2,
    top: -2,
    backgroundColor: '#FF3B30', 
    borderRadius: 12,
    minWidth: TABLET_DEVICE ? 20 : 15,
    height: TABLET_DEVICE ? 20 : 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF', 
    fontSize: TABLET_DEVICE ? 12 : 8,
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default MessageIconWithBadge;