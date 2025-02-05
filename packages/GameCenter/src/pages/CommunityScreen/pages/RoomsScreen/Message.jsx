import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import MessageItem from './MessageItem';

// Ağır liste verisi - 150 adet öğe (MessageItem için uygun veri yapısıyla)
const DATA = Array.from({ length: 150 }, (_, index) => ({
  id: String(index),
  username: `Kullanıcı ${index + 1}`,
  userAvatar: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`, // randomuser.me'den erkek portreleri
  timePosted: `${Math.floor(Math.random() * 24)} saat önce`,
  content: `Bu bir örnek mesaj içeriğidir ${index + 1}. Bu mesaj uzun ve karmaşık olabilir. Performansı test etmek için tasarlandı. Örneğin, bu mesaj çok satırlı ve farklı stil özelliklerine sahip olabilir. Hatta burada daha fazla metin olabilir ki listenin ne kadar performanslı olduğunu görelim.`,
  contentImage: index % 3 === 0 ? `https://via.placeholder.com/200x150/fedcba?text=Resim${index+1}` : null, // Bazı öğeler için örnek resim
  initialLikes: Math.floor(Math.random() * 100),
  commentCount: Math.floor(Math.random() * 20),
  shareCount: Math.floor(Math.random() * 5),
}));

// Her bir öğeyi render eden fonksiyon, şimdi MessageItem kullanıyor
const renderItem = ({ item }) => (
  <MessageItem message={item} />
);

const Message = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={DATA}
        renderItem={renderItem}
        estimatedItemSize={150} // MessageItem'ın tahmini yüksekliği, ayarlanabilir
        // contentContainerStyle={styles.listContentContainer} // İsteğe bağlı: Liste içeriği için stil
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Arka plan rengi daha hoş bir görünüm için
  },
  listContentContainer: {
    paddingVertical: 10, // Liste içeriğinin etrafında dikey boşluk
  },
});

export default Message;