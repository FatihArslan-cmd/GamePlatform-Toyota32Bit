import React from 'react';
import { View, Text } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { styles } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import ActiveLobbiesContent from '../../../Header/ActiveLobbiesContent';
import AddFriendToLobbyIcon from '../../../Header/components/AddFriendToLobbyIcon';
export default function AboutTab({ about }) {
  const formattedAbout = Array.isArray(about) ? about : [about];
  const navigation = useNavigation();


  return (
    <View style={[styles.aboutContainer, { paddingBottom: 80 }]}>
      <View style={styles.instructionWrapper}>
        {formattedAbout.map((item, index) => (
          <Surface key={index} style={styles.modernInstructionItem} elevation={2}>
            <Text style={styles.modernInstructionText}>{item}</Text>
          </Surface>
        ))}
      </View>
      <AddFriendToLobbyIcon
              onPress={() => {navigation.navigate('FriendInvitePage')} }
            />
     <ActiveLobbiesContent showNoLobby = {false} />
     <View style={{marginTop:55}}>
       <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('GameScreen');
        }}
        style={styles.startGameButton}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        icon="gamepad-variant"
      >
        Start Game
      </Button>
      </View>
    </View>
  );
}