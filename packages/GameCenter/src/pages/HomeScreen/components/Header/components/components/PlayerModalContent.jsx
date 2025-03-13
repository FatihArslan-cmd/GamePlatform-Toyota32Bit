import React, { useState } from 'react';
import { View, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import { Text, Menu, } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

const PlayerModalContent = ({ lobby, onPlayerAction }) => { // Prop adını onPlayerAction olarak değiştirdim
  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 0 });

  const handlePress = (event, itemId) => {
    event.target.measure((x, y, width, height, pageX, pageY) => {
      setAnchorPosition({ x: pageX, y: pageY + height });
      setVisibleMenuId(itemId);
    });
  };

  const renderPlayerItem = ({ item }) => (
    <View style={styles.playerItemContainer}>
      <TouchableOpacity
        style={styles.touchableArea}
        onPress={(e) => handlePress(e, item.id)}
      >
        <FastImage
          style={styles.profileImage}
          source={{
            uri: item.profilePhoto,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.playerText}>{item.username}</Text>
      </TouchableOpacity>

      <Menu
        visible={visibleMenuId === item.id}
        onDismiss={() => setVisibleMenuId(null)}
        anchor={{ x: anchorPosition.x, y: anchorPosition.y }}
      >
        <Menu.Item
          onPress={() => {
            onPlayerAction?.(item.id, 'kick'); // Kick aksiyonunu belirtiyorum
            setVisibleMenuId(null);
          }}
          title="Kick"
          titleStyle={styles.menuItemText}
        />
        <Menu.Item // Kick and Block Menu Item eklendi
          onPress={() => {
            onPlayerAction?.(item.id, 'kickAndBlock'); // Kick and Block aksiyonunu belirtiyorum
            setVisibleMenuId(null);
          }}
          title="Kick & Block"
          titleStyle={styles.menuItemText}
        />
      </Menu>
    </View>
  );

  return (
    <View>
      <FlatList
        data={lobby.members}
        renderItem={renderPlayerItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.playerListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playerListContainer: {
    paddingHorizontal: 10,
  },
  playerItemContainer: {
    flex: 1, // Equal spacing between items in columns
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5, // Spacing between columns
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  playerText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Orbitron-ExtraBold',
    textAlign: 'center',
  },
  noPlayersText: {
    fontSize: 16,
    color: '#d3d3d3',
    fontFamily: 'Orbitron-VariableFont_wght',
    textAlign: 'center',
    marginVertical: 20,
  },
  startGameButton: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
    borderRadius: 30,
    marginHorizontal: 20,
  },
  touchableArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    color: 'black', // Red color for kick option
    fontFamily: 'Orbitron-ExtraBold',
  },
});

export default PlayerModalContent;