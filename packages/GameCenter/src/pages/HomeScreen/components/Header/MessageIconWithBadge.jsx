import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native'; // TouchableOpacity ekledik
import { IconButton, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const MessageIconWithBadge = ({ unreadCount = 0, navigateTo }) => { // navigateTo prop eklendi
  const navigation = useNavigation();

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo); // navigateTo prop ile belirtilen ekrana git
    }
  };

  return (
    <TouchableOpacity // IconButton yerine TouchableOpacity kullanıyoruz
      style={styles.container}
      onPress={handlePress} // onPress olayını handlePress fonksiyonuna bağlıyoruz
      activeOpacity={0.7} // Basıldığında hafifçe solma efekti (isteğe bağlı)
    >
      <IconButton
        icon="message-outline"
        color="gray"
        size={24}
        // onPress prop'unu kaldırıyoruz çünkü TouchableOpacity onPress'i kullanıyoruz
        style={{margin: 0}} // IconButton margin'ini sıfırlıyoruz, TouchableOpacity ile daha iyi kontrol için
      />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity> // TouchableOpacity ile sarıyoruz
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // IconButton'ı TouchableOpacity içinde daha iyi hizalamak için flexbox kullanabiliriz
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