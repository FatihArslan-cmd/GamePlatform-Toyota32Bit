import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native'; // Import TouchableOpacity and Alert
import { 
  Card, 
  Text, 
  Title, 
  Chip, 
  Button, 
  Surface 
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { getToken } from '../../../../shared/states/api';
import Clipboard from '@react-native-clipboard/clipboard'; // Import Clipboard
import ToastMessage from '../../../../components/ToastMessage/Toast';

const { width } = Dimensions.get('window');

const ActiveLobbiesContent = () => {
  const [userLobby, setUserLobby] = useState(null);
  const userId = 1;
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // Default type

  useEffect(() => {
    const fetchLobbies = async () => {
      const token = getToken();
      try {
        const response = await axios.get('http://10.0.2.2:3000/api/lobby/list', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data?.lobbies) {
          const ownerLobby = response.data.lobbies.find((lobby) => lobby.ownerId === userId);
          setUserLobby(ownerLobby);
        }
      } catch (error) {
        console.error('Error fetching lobby data:', error);
      }
    };

    fetchLobbies();
  }, []);

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };


  const copyLobbyCodeToClipboard = async (code) => {
    try {
      await Clipboard.setString(code);
      showToast('Lobby code successfully copied!', 'success');
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      showToast('Failed to copy lobby code.', 'error');
    }
  };

  const renderLobbyContent = () => {
    if (!userLobby) {
      return (
        <Surface style={styles.noLobbyContainer}>
          <Text style={styles.noLobbyText}>No Active Lobby</Text>
          <Button mode="contained" onPress={() => {}}>
            Create Lobby
          </Button>
        </Surface>
      );
    }

    return (
      <Card style={styles.lobbyCard}>
        <View style={styles.cardHeaderActions}>
          {/* Make codeContainer touchable */}
          <TouchableOpacity 
            style={styles.codeContainer}
            onPress={() => copyLobbyCodeToClipboard(userLobby.code)}
          >
            <Icon name="code-tags" size={20} color="#666" />
            <Text style={styles.lobbyCode}>{userLobby.code}</Text>
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <Icon 
              name="update" 
              size={24} 
              color="#4a148c"
              onPress={() => {/* Update lobby */}}
              style={styles.iconButton}
            />
            <Icon 
              name="close" 
              size={24} 
              color="red"
              onPress={() => {/* Close lobby */}}
              style={styles.iconButton}
            />
          </View>
        </View>

        <Card.Content>
          <Title style={styles.lobbyName}>{userLobby.lobbyName}</Title>
          
          <View style={styles.typeBadge}>
            <Icon name="tag" size={16} color="#666" />
            <Text style={styles.lobbyType}>{userLobby.lobbyType.toUpperCase()}</Text>
          </View>

          <View style={styles.lobbyDetails}>
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Icon name="crown" size={20} color="#FFD700" />
                <Text style={styles.detailLabel}>Owner</Text>
              </View>
              <Text>{userLobby.ownerId}</Text>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Icon name="account-group" size={20} color="#4a148c" />
                <Text style={styles.detailLabel}>Players</Text>
              </View>
              <Text>
                {userLobby.members.length}/{userLobby.maxCapacity}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <Button 
              mode="contained" 
              onPress={() => {/* Leave lobby */}}
              style={styles.leaveButton}
            >
              <Icon name="exit-run" size={20} color="white" />
              Leave
            </Button>
            <Button 
              mode="contained" 
              onPress={() => {/* Join lobby */}}
              style={styles.joinButton}
            >
              <Icon name="account-plus" size={20} color="white" />
              Join
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {toastVisible && (
        <ToastMessage
          type={toastType}
          message={toastMessage}
          onHide={hideToast}
        />
      )}
      {renderLobbyContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  lobbyCard: {
    width: width * 0.90,
    elevation: 4,
  },
  cardHeaderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lobbyCode: {
    marginLeft: 5,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  lobbyName: {
    textAlign: 'center',
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  lobbyType: {
    marginLeft: 5,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  lobbyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailLabel: {
    marginLeft: 5,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  leaveButton: {
    width: '48%',
    backgroundColor: '#FF5722',
  },
  joinButton: {
    width: '48%',
    backgroundColor: '#4CAF50',
  },
  noLobbyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noLobbyText: {
    marginBottom: 20,
    fontFamily: 'Orbitron-VariableFont_wght',
  },
});

export default ActiveLobbiesContent;