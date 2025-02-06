import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Chip } from 'react-native-paper';
import { topics } from './topics';

const CommunityTopics = ({ onTopicSelect, selectedTopic }) => {

  const handleTopicPress = (topic) => {
    console.log("Selected Topic:", topic); // Seçilen topic'i konsola yazdır
    onTopicSelect(topic);
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {topics.map((topic, index) => (
        <Chip
          key={index}
          style={[
            styles.chip,
            topic === selectedTopic ? styles.selectedChip : null,
          ]}
          textStyle={[
            styles.chipText,
            topic === selectedTopic ? styles.selectedChipText : null,
          ]}
          onPress={() => handleTopicPress(topic)}  // onPress'i güncelledik
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
    paddingTop:60,
  },
  chip: {
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.3,
    paddingHorizontal: 18,
  },
  chipText: {
    fontFamily: 'Orbitron-ExtraBold',
  },
  selectedChip: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  selectedChipText: {
    color: 'white',
  },
});

export default CommunityTopics;