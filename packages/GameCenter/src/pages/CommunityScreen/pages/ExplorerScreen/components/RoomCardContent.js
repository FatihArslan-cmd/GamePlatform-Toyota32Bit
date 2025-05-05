import FastImage from "react-native-fast-image";
import React from "react";
import formatDate from "../../../../../utils/FormatDate";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../../../context/ThemeContext";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

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

const createStyles = () => StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: TABLET_DEVICE ? 140 : 100,
    borderRadius: 20,
  },
  image: {
    width: TABLET_DEVICE ? 140 : 100,
    height: '100%',
    borderRadius:50,
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
    fontSize: TABLET_DEVICE ? 18 : 14,
    fontFamily: 'Orbitron-ExtraBold',
    flex: 1,
  },
  topic: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 14 : 12,
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
    fontSize: TABLET_DEVICE ? 12 : 10,
  },
  supporterContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  supporters: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 12 : 10,
  },
});

export default RoomCardContent;