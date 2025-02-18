import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // useFocusEffect import edildi
import lobbyService from './services/lobbyService';
import { useCallback } from 'react'; // useCallback import edildi

const MessageIconWithBadge = ({ navigateTo }) => {
  const navigation = useNavigation();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchInvitationCount = useCallback(async () => { // useCallback ile fonksiyonu sar
    try {
      const count = await lobbyService.getInvitationCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to fetch invitation count:", error);
    }
  }, []); // useCallback için boş bağımlılık dizisi, fonksiyon referansı sabit kalsın

  useFocusEffect( // useEffect yerine useFocusEffect kullanılıyor
    useCallback(() => {
      fetchInvitationCount();
      return () => {
        // Component focus dışına çıktığında yapılacak işlemler (isteğe bağlı)
        // Örneğin, bir temizleme işlemi veya state resetleme
      };
    }, [fetchInvitationCount]) // useCallback ile oluşturulan fetchInvitationCount fonksiyonunu bağımlılık olarak ekle
  );

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <IconButton
        icon="message-outline"
        color="gray"
        size={24}
        style={{margin: 0}}
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
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default MessageIconWithBadge;