import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { topics } from './topics';
import { useExplorer } from '../context/ExplorerContext';
import { useTheme } from '../../../../../context/ThemeContext';
import {useTranslation} from 'react-i18next';
const CommunityTopics = ({ showAllButton }) => {
  const { selectedTopic, handleTopicSelect } = useExplorer();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  const allButtonTitle = t('communityScreen.all');

  const handleTopicPress = (topic) => {
    handleTopicSelect(topic);
  };

  let renderTopics = topics;
  if (showAllButton) {
    renderTopics = [allButtonTitle, ...topics];
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      fadingEdgeLength={50}
    >
      {renderTopics.map((topic, index) => (
        <Chip
          key={index}
          style={[
            styles.chip,
            { backgroundColor: colors.card, borderColor: colors.border },
            (topic === selectedTopic || (selectedTopic === null && topic === allButtonTitle)) && styles.selectedChip,
          ]}
          textStyle={[
            styles.chipText,
            { color: colors.text },
            (topic === selectedTopic || (selectedTopic === null && topic === allButtonTitle)) && styles.selectedChipText,
          ]}
          onPress={() => handleTopicPress(topic)}
        >
          {topic}
        </Chip>
      ))}
    </ScrollView>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 60,
  },
  chip: {
    marginHorizontal: 4,
    borderRadius: 5,
    borderWidth: 0.3,
    paddingHorizontal: 18,
  },
  chipText: {
    fontFamily: 'Orbitron-ExtraBold',
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  selectedChipText: {
    color: colors.navigationBarIconBg,
  },
});

export default CommunityTopics;