import Clipboard from "@react-native-clipboard/clipboard";
import CustomModal from "../../../../components/CustomModal";
import JoinLobbyModalContent from "./components/JoinLobbyModalContent";
import JoinableLobbyCardContent from "./components/JoinableLobbyCardContent";
import JoinableLobbyCardHeaderActions from "./components/JoinableLobbyCardHeaderActions";
import React, { useCallback, useState } from "react";
import lobbyService from "../../../HomeScreen/components/Header/services/lobbyService";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { useBingoWebSocket } from "../../../../context/BingoGameWebsocket";
import { useTheme } from "../../../../context/ThemeContext";
import { ToastService } from "../../../../context/ToastService";

const JoinableLobbyCard = ({ lobby, onLobbyJoined }) => {
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [currentLobby] = useState(lobby);
  const [password, setPassword] = useState('');
  const { connectWebSocket } = useBingoWebSocket();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const copyLobbyCodeToClipboard = useCallback(async (code) => {
    try {
      await Clipboard.setString(code);
      ToastService.show('success', t('homeScreen.lobbyCodeCopied'));
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      ToastService.show('error', t('gameDetailsScreen.failedToCopyLobbyCode'));
    }
  }, [t]);

  const handleJoinLobby = async () => {
    setJoinModalVisible(false);
    try {
      if (currentLobby.hasPassword) {
        await lobbyService.joinLobby(currentLobby.code, password);
              ToastService.show('success', t('homeScreen.joinLobbySuccessToast'));

      } else {
        await lobbyService.joinLobby(currentLobby.code);
              ToastService.show('success', t('homeScreen.joinLobbySuccessToast'));

      }
      connectWebSocket(currentLobby.code);

      if (onLobbyJoined && typeof onLobbyJoined === 'function') {
         onLobbyJoined();
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
          ToastService.show('error', error.response.data.message);
      } else {
          ToastService.show('error', t('gameDetailsScreen.failedToJoinLobby'));
      }
       console.error("Error joining lobby:", error);
    }
  };

  return (
    <Card style={[styles.lobbyCard, { backgroundColor: colors.card }]}>
      <JoinableLobbyCardHeaderActions
        copyLobbyCodeToClipboard={copyLobbyCodeToClipboard}
        lobbyCode={currentLobby.code}
        lobby={currentLobby}
      />

      <Card.Content>
        <JoinableLobbyCardContent
          lobby={currentLobby}
          setJoinModalVisible={setJoinModalVisible}
        />
      </Card.Content>

      <CustomModal
        visible={joinModalVisible}
        onDismiss={() => {setJoinModalVisible(false); setPassword('');}}
        title={t('gameDetailsScreen.joinLobbyModalTitle')}
        text={currentLobby.hasPassword ? t('gameDetailsScreen.joinLobbyModalPasswordProtectedText') : t('gameDetailsScreen.joinLobbyModalConfirmationText')}
        confirmText={t('gameDetailsScreen.joinLobbyButton')}
        showConfirmButton={true}
        onConfirm={handleJoinLobby}
        backgroundColor={colors.card}
        textColor={colors.text}
        titleColor={colors.text}
      >
        <JoinLobbyModalContent
          hasPassword={currentLobby.hasPassword}
          password={password}
          setPassword={setPassword}
        />
      </CustomModal>
    </Card>
  );
};

const styles = StyleSheet.create({
  lobbyCard: {
    elevation: 4,
    borderRadius: 20,
    marginVertical: 20,
  },
});

export default JoinableLobbyCard;