import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { FlashList } from "@shopify/flash-list";

// Ağır liste verisi - 150 adet öğe
const DATA = Array.from({ length: 150 }, (_, index) => ({
  id: String(index),
  title: `Ağır Liste Öğesi ${index + 1}`,
  description: `Bu öğe, uzun ve karmaşık bir açıklamaya sahip olabilir. Performansı test etmek için tasarlandı. Örneğin, bu açıklama çok satırlı ve farklı stil özelliklerine sahip olabilir. Hatta burada daha fazla metin olabilir ki listenin ne kadar performanslı olduğunu görelim.`,
  imageUrl: `https://via.placeholder.com/150/f0f0f0?text=Resim${index+1}`, // Örnek resim URL'si
  extraData: Array.from({length: 5}, (_, i) => `Ek bilgi ${i+1} için öğe ${index+1}`), // Ek veriler
}));

// Her bir öğeyi render eden fonksiyon
const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
    {item.extraData.map((data, index) => (
      <Text key={index} style={styles.extraText}>{data}</Text>
    ))}
    {/* İsteğe bağlı: Ağırlaştırmak için resim ekleyebilirsiniz (performansı etkileyebilir) */}
    {/* <Image source={{ uri: item.imageUrl }} style={styles.image} /> */}
  </View>
);

const Message = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={DATA}
        renderItem={renderItem}
        estimatedItemSize={200} // Tahmini öğe yüksekliği. Performansı artırmak için önemli.
        // contentContainerStyle={styles.listContentContainer} // İsteğe bağlı: Liste içeriği için stil
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContentContainer: {
    padding: 10, // İsteğe bağlı: Liste içeriğinin etrafında boşluk
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  extraText: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
});

export default Message;