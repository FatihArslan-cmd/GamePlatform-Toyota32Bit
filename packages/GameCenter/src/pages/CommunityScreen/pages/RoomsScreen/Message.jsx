import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import MessageItem from './MessageItem';


const DATA = Array.from({ length: 150 }, (_, index) => ({
  id: String(index),
  username: `Kullanıcı ${index + 1}`,
  userAvatar: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
  timePosted: `${Math.floor(Math.random() * 24)} saat önce`,
  content: `Bu bir örnek mesaj içeriğidir ${index + 1}. Performansı test etmek için tasarlandı.`,
  contentImage: index % 3 === 0 ? `https://via.placeholder.com/200x150/fedcba?text=Resim${index+1}` : null,
  initialLikes: Math.floor(Math.random() * 100),
  commentCount: Math.floor(Math.random() * 20),
  shareCount: Math.floor(Math.random() * 5),
}));

const Message = ({ onScroll, listRef }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        ref={listRef}
        data={DATA}
        renderItem={({ item }) => <MessageItem message={item} />}
        estimatedItemSize={150}
        onScroll={onScroll} // Kaydırma olayını dinliyoruz
        scrollEventThrottle={16} // Daha akıcı kaydırma olayları için
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Message;
