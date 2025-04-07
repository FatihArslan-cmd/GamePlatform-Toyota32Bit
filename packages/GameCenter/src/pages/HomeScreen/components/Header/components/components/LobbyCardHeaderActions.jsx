import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { useTheme } from "../../../../../../context/ThemeContext";
import { UserContext } from "../../../../../../context/UserContext";
import { isTablet } from "../../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const LobbyCardHeaderActions = ({ copyLobbyCodeToClipboard, lobbyCode, ownerUsername, setDeleteModalVisible }) => {
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

            <TouchableRipple onPress={() => setDeleteModalVisible(true)}>
              <Icon
                name="close"
                size={TABLET_DEVICE ? 24 :16}
                color={colors.error}
                style={styles.iconButton}
              />
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
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default LobbyCardHeaderActions;