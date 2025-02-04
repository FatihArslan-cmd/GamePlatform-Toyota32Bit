import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

const CommunityTopics = () => {
  const topics = [
    "Sports",
    "AI",
    "Art",
    "Travel",
    "Tech",
    "Health",
    "Food",
    "Space",
    "Startups",
    "Crypto"
  ];

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {topics.map((topic, index) => (
        <Chip
          key={index}
          style={styles.chip}
          textStyle={styles.chipText}
          onPress={() => console.log(`${topic} selected!`)}
        >
          {topic}
        </Chip>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chip: {
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.3,
    paddingHorizontal: 18
  },
  chipText: {
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default CommunityTopics;