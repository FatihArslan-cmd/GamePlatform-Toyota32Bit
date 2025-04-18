import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import formatDate from '../../../../../utils/FormatDate';
import { useTheme } from '../../../../../context/ThemeContext';
import {useTranslation} from 'react-i18next';

const RoomCardContent = ({ room }) => {
  const { colors } = useTheme(); 
  const styles = createStyles(colors); 
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <FastImage
        source={{ uri: room.imageUrl, priority: FastImage.priority.high }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{room.name}</Text>
          <Text style={[styles.date, { color: colors.subText }]}>{formatDate(room.createdAt)}</Text>
        </View>

        <Text style={[styles.topic, { color: colors.subText }]}>{room.topic}</Text>

        <View style={styles.footer}>
          <View style={[styles.supporterContainer, { backgroundColor: colors.border }]}>
            <Text style={[styles.supporters, { color: colors.text }]}>
              {room.supporterCount} {t('communityScreen.supporters')} 
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 140,
    borderRadius: 20,
  },
  image: {
    width: 140,
    height: '100%',
    borderRadius:20,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Orbitron-ExtraBold',
    flex: 1,
  },
  topic: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 14,
    marginBottom: 8,
    height: 35,
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 12,
  },
  supporterContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  supporters: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 12,
  },
});

export default RoomCardContent;