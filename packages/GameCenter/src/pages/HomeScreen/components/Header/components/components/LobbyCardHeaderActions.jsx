import AddFriendToLobbyIcon from "./AddFriendToLobbyIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../../../../context/ThemeContext";
import { UserContext } from "../../../../../../context/UserContext";
import { NavigationService } from "../../../../../../shared/states/NavigationService";
import { isTablet } from "../../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const LobbyCardHeaderActions = ({ copyLobbyCodeToClipboard,closeBottomSheet, lobbyCode, ownerUsername, setDeleteModalVisible }) => {
 const { user } = useContext(UserContext);
 const { colors } = useTheme(); 

    return (
    <View style={styles.cardHeaderActions}>
      <TouchableOpacity
        style={styles.codeContainer}
        onPress={() => copyLobbyCodeToClipboard(lobbyCode)}
      >
        <Icon name="code-tags" size={TABLET_DEVICE ? 24 :16} color={colors.text} />
        <Text style={[styles.lobbyCode, { color: colors.text }]}>{lobbyCode}</Text> 
      </TouchableOpacity>
      <View style={styles.headerIcons}>
        {user && user.username === ownerUsername ? (
          <>
            <AddFriendToLobbyIcon closeBottomSheet={closeBottomSheet}/>
            <TouchableRipple 
              onPress={() => setDeleteModalVisible(true)}
              style={styles.closeButton}
            >
              <View style={styles.closeButtonContent}>
                <Icon
                  name="close"
                  size={TABLET_DEVICE ? 24 :16}
                  color={colors.error}
                />
              </View>
            </TouchableRipple>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: TABLET_DEVICE ? 14 : 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  closeButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: TABLET_DEVICE ? 32 : 28,
    height: TABLET_DEVICE ? 32 : 28,
  },
});

export default LobbyCardHeaderActions;