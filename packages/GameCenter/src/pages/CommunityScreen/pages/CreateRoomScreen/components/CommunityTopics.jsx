import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";
import { topics } from "../../ExplorerScreen/components/topics";
import { useCreateRoom } from "../context/CreateRoomContext";

const TABLET_DEVICE = isTablet();

const CommunityTopics = ({ showAllButton }) => {
  const { topic, handleTopicSelectAndCreate } = useCreateRoom();
  const allButtonTitle = "All";
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const handleTopicPress = (topic) => {
    handleTopicSelectAndCreate(topic);
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
      {renderTopics.map((topicItem, index) => (
        <Chip
          key={index}
          style={[
            styles.chip,
            { backgroundColor: colors.card, borderColor: colors.border },
            topicItem === topic || (topic === null && topicItem === allButtonTitle) ? styles.selectedChip : null,
          ]}
          textStyle={[
            styles.chipText,
            { color: colors.text },
            topicItem === topic || (topic === null && topicItem === allButtonTitle) ? styles.selectedChipText : null,
          ]}
          onPress={() => handleTopicPress(topicItem)}
        >
          {topicItem}
        </Chip>
      ))}
    </ScrollView>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: TABLET_DEVICE ? 20 : 10,
  },
  chip: {
    marginHorizontal: 4,
    borderRadius: 5,
    borderWidth: 0.3,
    paddingHorizontal: TABLET_DEVICE ? 18 : 10,
  },
  chipText: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 16 : 10,
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