import { Dimensions, StyleSheet } from "react-native";
import { isTablet } from "../../utils/isTablet";

const { height, width } = Dimensions.get('window');
const TABLET_DEVICE = isTablet();

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
        padding: 24,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        elevation: 15,
      },
      title: {
         fontSize: TABLET_DEVICE ? 28 : 20,
        marginBottom: 24,
        textAlign: 'center',
        letterSpacing: 0.5,
        fontFamily: 'Orbitron-ExtraBold'
      },
      tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
      },
      tabButton: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 20,
        
      },
      tabContent: {
        flex: 1,
      },
    
      instructionContainer: {
        marginBottom: 20,
        padding: 16,
        borderRadius: 20,
      },
      instructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 12,
        padding: 12,
        borderRadius: 20,
        elevation: 2,
      },
      aboutContainer: {
        flex: 1,
        padding: 16,
        position: 'relative', 
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
      },
      instructionNumberContainer: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
      },
 
      modernInstructionText: {
        flex: 1,
        padding: TABLET_DEVICE ? 16 : 0,
        fontSize: TABLET_DEVICE ? 16 : 11,
        lineHeight: TABLET_DEVICE ? 24 : 18,
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
        height: TABLET_DEVICE ? 48 : 36,
      },
      buttonLabel: {
        fontSize: TABLET_DEVICE ? 16 : 12,
        letterSpacing: 1,
        fontFamily: 'Orbitron-ExtraBold',
      },
      startGameButton: {
        borderColor: '#4a148c',
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 16,
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
        fontFamily: 'Orbitron-ExtraBold',
      },
      instructionText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        color: '#1a1a1a',
        fontFamily: 'Orbitron-ExtraBold',
      },
      lobbiesContainer: {
        marginBottom: 20,
      },
      createLobbyButton: {
        marginBottom: 16,
        backgroundColor: '#4a148c',
        borderRadius: 20,
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
    badgeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    lobbyTypeBadge: {
      backgroundColor: '#673ab7', // Or any color you prefer
      color: 'white',
    },
   inProgressBadge: {
     backgroundColor: '#f44336',
      marginLeft: 5
  },
  lobbyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
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
          fontSize: TABLET_DEVICE ? 18 : 14,
          fontFamily: 'Orbitron-ExtraBold',
          marginBottom: 4,
      },
      dateText: {
          fontSize: TABLET_DEVICE ? 14 : 12,
          color: '#666',
          fontFamily: 'Orbitron-VariableFont_wght',
      },
      historyInfoItem: {
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 16,
      },
      scoreText: {
          fontSize: TABLET_DEVICE ? 16 : 14,
          color: '#4a148c',
          fontFamily: 'Orbitron-ExtraBold',
      },
      durationText: {
          fontSize: TABLET_DEVICE ? 14 : 12,
          color: '#666',
          fontFamily: 'Orbitron-VariableFont_wght',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      errorText: {
          fontSize: 16,
          color: 'red',
      },      settingsContainer: {
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
          fontFamily: 'Orbitron-ExtraBold',

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

