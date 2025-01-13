import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      backButton: {
        position: 'absolute',
        top: 40,
        left: 16,
        zIndex: 10,
      },
      image: {
        borderRadius: 55,
        width: width * 0.6,
        height: height * 0.2,
        resizeMode: 'contain',
      },
      contentWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '65%',
      },
      infoContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 24,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        elevation: 15,
      },
      title: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: 'center',
        color: '#4a148c',
        letterSpacing: 0.5,
        fontFamily: 'Orbitron-VariableFont_wght',
      },
      tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
      },
      tabButton: {
        flex: 1,
        marginHorizontal: 4,
      },
      tabContent: {
        flex: 1,
      },
      
      // Instructions styles
      instructionContainer: {
        marginBottom: 20,
        backgroundColor: '#fffff',
        padding: 16,
        borderRadius: 20,
      },
      instructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 20,
        elevation: 2,
      },
      aboutContainer: {
        flex: 1,
        justifyContent: 'space-between', // Alanı eşit şekilde dağıt
        padding: 16,
      },

      instructionWrapper: {
        padding: 16,
        marginBottom: 24,
      },
      modernInstructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      },
      instructionNumberContainer: {
        backgroundColor: '#4a148c',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
      },
 
      modernInstructionText: {
        flex: 1,
        padding: 16,
        fontSize: 16,
        lineHeight: 24,
        color: '#333333',
        fontFamily: 'Orbitron-VariableFont_wght',
      },
      modernLobbyCard: {
        marginHorizontal: 16,
        marginBottom: 24,
        borderRadius: 20,
        elevation: 4,
      },
      modernLobbyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      modernLobbyTitle: {
        fontSize: 20,
        color: '#4a148c',
        fontFamily: 'Orbitron-VariableFont_wght',
      },
      divider: {
        marginBottom: 16,
        height: 1,
        backgroundColor: 'rgba(74, 20, 140, 0.1)',
      },
      modernLobbyStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
      },
      statCard: {
        flex: 1,
        margin: 4,
        padding: 12,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#ffffff',
      },
      statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4a148c',
        marginVertical: 4,
        fontFamily: 'Orbitron-VariableFont_wght',
      },
      statLabel: {
        fontSize: 12,
        color: '#666666',
        fontFamily: 'Orbitron-VariableFont_wght',
      },
      modernJoinButton: {
        borderRadius: 12,
        backgroundColor: '#4a148c',
        elevation: 2,
      },
   
      buttonContent: {
        height: 48,
      },
      buttonLabel: {
        fontSize: 16,
        letterSpacing: 1,
        fontFamily: 'Orbitron-VariableFont_wght',
      },
      startGameButton: {
        borderColor: '#4a148c',
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'center',
        width: '90%',
      },
      instructionNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#4a148c',
        color: 'white',
        textAlign: 'center',
        lineHeight: 28,
        marginRight: 12,
        fontFamily: 'Orbitron-VariableFont_wght',
    },
      instructionText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        color: '#1a1a1a',
        fontFamily: 'Orbitron-VariableFont_wght',
      },
      // Lobbies styles
      lobbiesContainer: {
        marginBottom: 20,
      },
      createLobbyButton: {
        marginBottom: 16,
        backgroundColor: '#4a148c',
      },
      lobbyCard: {
        marginBottom: 12,
        elevation: 2,
      },
      lobbyContent: {
        padding: 16,
      },
      lobbyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        fontFamily: 'Orbitron-VariableFont_wght',

      },
      lobbyName: {
        fontSize: 18,
        fontFamily: 'Orbitron-VariableFont_wght',
    },
      inProgressBadge: {
        backgroundColor: '#FFA000',
      },
      lobbyInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
      },
    // ... (previous code remains the same until styles)
        
        // Continuing styles
        lobbyInfoItem: {
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 16,
      },
      lobbyInfoText: {
          fontSize: 14,
          color: '#666',
          marginLeft: 4,
          fontFamily: 'Orbitron-VariableFont_wght',

      },
      joinButton: {
          marginTop: 8,
          borderColor: '#4a148c',
      },
      // History styles
      historyContainer: {
          marginBottom: 20,
      },
      historyCard: {
          marginBottom: 12,
          elevation: 2,
      },
      historyContent: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
      },
      historyLeft: {
          flex: 1,
      },
      historyRight: {
          flexDirection: 'row',
          alignItems: 'center',
      },
      resultText: {
          fontSize: 18,
          fontFamily: 'Orbitron-VariableFont_wght',
          marginBottom: 4,
      },
      dateText: {
          fontSize: 14,
          color: '#666',
          fontFamily: 'Orbitron-VariableFont_wght',
      },
      historyInfoItem: {
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 16,
      },
      scoreText: {
          fontSize: 16,
          fontWeight: '600',
          color: '#4a148c',
          fontFamily: 'Orbitron-VariableFont_wght',
      },
      durationText: {
          fontSize: 14,
          color: '#666',
          fontFamily: 'Orbitron-VariableFont_wght',
      },
      // Settings styles
      settingsContainer: {
          marginBottom: 20,
      },
      settingsCard: {
          elevation: 2,
      },
      settingItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',

      },
      settingLabel: {
          fontSize: 16,
          color: '#333',
          fontFamily: 'Orbitron-VariableFont_wght',

      },
      settingControls: {
          flexDirection: 'row',
          alignItems: 'center',
      },
      settingValue: {
          fontSize: 16,
          color: '#4a148c',
          marginHorizontal: 8,
          minWidth: 24,
          fontFamily: 'Orbitron-VariableFont_wght',
          textAlign: 'center',
      },
});

