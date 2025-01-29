// AchievementCard.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Avatar, useTheme, IconButton } from 'react-native-paper';

const AchievementCard = ({ item }) => {
  const theme = useTheme();
   const getRarityStyle = () => {
        switch(item.rarity) {
            case 'Rare':
                return { color: theme.colors.secondary, fontWeight: 'bold' };
             case 'Uncommon':
                 return { color: '#2ecc71', fontWeight: 'bold' };
            case 'Epic':
                 return { color: '#9b59b6', fontWeight: 'bold' };
            case 'Legendary':
                return { color: '#f1c40f', fontWeight: 'bold' };
            default:
                return  {color: theme.colors.surfaceVariant}
        }
    }
  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content style={styles.cardContent}>
        <Avatar.Icon 
          size={48} 
          icon="trophy" 
          style={[styles.avatar, { backgroundColor: theme.colors.primaryContainer }]}
          color={theme.colors.primary}
        />
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.title}>{item.title}</Text>
          <Text variant="bodyMedium" style={styles.description}>{item.description}</Text>
          <View style={styles.detailsContainer}>
              <Text  variant="labelMedium" style={[styles.rarity, getRarityStyle()]} >
                 {item.rarity}
              </Text>
            <View style={styles.xpContainer}>
              <IconButton
                icon="star"
                size={16}
                iconColor={theme.colors.primary}
                style={styles.xpIcon}
              />
              <Text variant="labelMedium" style={styles.xp}>
                {item.xp} XP
              </Text>
            </View>
          </View>
        </View>
        <Text variant="labelSmall" style={styles.date}>{item.date}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'SQR721B'
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
    fontFamily: 'SQR721B',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
    rarity: {
      marginRight: 8,
        fontFamily: 'SQR721B',

    },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpIcon: {
    margin: 0,
    padding: 0,
  },
  xp: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: -4,
    fontFamily: 'SQR721B',
},
  date: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 8,
    fontFamily: 'SQR721B',
  },
});

export default AchievementCard;