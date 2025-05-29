import BottomSheet from "../../../../components/BottomSheet";
import CustomDateTimeSelector from "./components/DateTimeSelector";
import GameSelector from "./components/GameSelector";
import InvitationLink from "./components/InvitationLink";
import LobbyTypeSelector from "./components/LobbyTypeSelector";
import PasswordInput from "./components/PasswordInput";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useBingoWebSocket } from "../../../../context/BingoGameWebsocket";
import { ToastService } from "../../../../context/ToastService";
import { isTablet } from "../../../../utils/isTablet";
import { createLobby } from "./service/service";

const TABLET_DEVICE = isTablet();

const CreateLobbyModal = ({ visible, onDismiss }) => {
    const [lobbyType, setLobbyType] = useState('Normal');
    const [lobbyName, setLobbyName] = useState('');
    const [gameName, setGameName] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCodeGenerated, setIsCodeGenerated] = useState(false);
    const [hasPassword, setHasPassword] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { connectWebSocket } = useBingoWebSocket();
    const { t } = useTranslation();

    const toggleLobbyType = useCallback(() => {
        setLobbyType((current) => (current === 'Normal' ? 'Event' : 'Normal'));
    }, []);


    const handleSave = useCallback(async () => {
        if (!lobbyName.trim()) {
            ToastService.show("error", t('createLobbyModal.toastMessages.emptyLobbyName'));
            return;
        }
        if (!gameName.trim()) {
            ToastService.show("error", t('createLobbyModal.toastMessages.emptyGameName'));
            return;
        }
        if (!maxCapacity.trim()) {
            ToastService.show("error", t('createLobbyModal.toastMessages.emptyMaxCapacity'));
            return;
        }

        if (hasPassword && !password.trim()) {
            ToastService.show("error", t('createLobbyModal.toastMessages.emptyPassword'));
            return;
        }

        if (lobbyType === 'Event' && (!startDate || !endDate)) {
            ToastService.show("error", t('createLobbyModal.toastMessages.requireStartEndDate'));
            return;
        }


        const requestBody = {
            lobbyName,
            lobbyType,
            gameName,
            code,
            maxCapacity: parseInt(maxCapacity, 10),
            password: hasPassword ? password : null,
            hasPassword: hasPassword,
            ...(lobbyType === 'Event' && { startDate: startDate.toISOString(), endDate: endDate.toISOString() }),
        };

        try {
            const data = await createLobby(requestBody);
            connectWebSocket(data.lobby.code);
            setCode(`${data.lobby.code}`);
            setIsCodeGenerated(true);
            ToastService.show("success", t('homeScreen.lobbyCreated'));
        } catch (error) {
            ToastService.show("error", error.message);
        }
    }, [lobbyName, lobbyType, gameName, password, maxCapacity, hasPassword, startDate, endDate, t, connectWebSocket]);

    const resetLobby = useCallback(() => {
        setLobbyType('Normal');
        setPassword('');
        setMaxCapacity('');
        setCode('');
        setError('');
        setGameName('');
        setLobbyName('');
        setIsCodeGenerated(false);
        setHasPassword(false);
        setStartDate(new Date());
        setEndDate(new Date());
    }, []);

    const handleDismiss = useCallback(() => {
        resetLobby();
        onDismiss();
    }, [onDismiss, resetLobby]);


    const bottomSheetHeight = isCodeGenerated
    ? (TABLET_DEVICE ? '50%' : '95%')
    : (lobbyType === 'Normal'
        ? (TABLET_DEVICE ? '55%' : '75%')
        : (TABLET_DEVICE ? '76%' : '99%'));

    return (
        <BottomSheet
            visible={visible}
            onDismiss={handleDismiss}
            title={t('createLobbyModal.title')}
            height={bottomSheetHeight}
            backgroundColor="white"
        >
            <View style={styles.container}>
                {!isCodeGenerated ? (
                    <>
                        <LobbyTypeSelector lobbyType={lobbyType} onToggle={toggleLobbyType} t={t} />
                        {lobbyType === 'Event' && (
                            <CustomDateTimeSelector
                                initialStartDate={startDate}
                                initialEndDate={endDate}
                                onDateTimeChange={(type, date) => {
                                    if (type === 'startDate') {
                                        setStartDate(date);
                                    } else if (type === 'endDate') {
                                        setEndDate(date);
                                    }
                                }}
                                t={t}
                            />
                        )}
                        <GameSelector
                            gameName={gameName}
                            lobbyName={lobbyName}
                            maxCapacity={maxCapacity}
                            onGameNameChange={setGameName}
                            onLobbyNameChange={setLobbyName}
                            onMaxCapacityChange={setMaxCapacity}
                            t={t}
                        />
                    <PasswordInput
                      password={password}
                      isPasswordVisible={isPasswordVisible}
                      onPasswordChange={setPassword}
                      onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
                      hasPassword={hasPassword}
                      onPasswordToggle={setHasPassword}
                      t={t}
                       />
                        <Button
                            mode="contained"
                            onPress={handleSave}
                            style={[
                                styles.createButton,
                                isCodeGenerated && styles.createButtonWithLink,
                            ]}
                            contentStyle={styles.createButtonContent}
                            labelStyle={styles.createButtonLabel}
                            icon="plus-circle"
                        >
                            {t('createLobbyModal.buttons.createLobby')}
                        </Button>
                    </>
                ) : (
                    <View style={styles.successContainer}>
                        <InvitationLink code={code} t={t} />
                        <Button
                            mode="outlined"
                            onPress={resetLobby}
                            style={styles.resetButton}
                            icon="refresh"
                            labelStyle={styles.resetButtonLabel}
                        >
                            {t('createLobbyModal.buttons.createNewLobby')}
                        </Button>
                    </View>
                )}
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    createButton: {
        marginTop: 'auto',
        paddingVertical: 5,
        borderRadius: 20,
    },
    createButtonWithLink: {
        marginTop: 16,
    },
    createButtonContent: {
        height:36,
    },
    createButtonLabel: {
        fontSize: TABLET_DEVICE ? 16 : 12,
    },
    resetButton: {
        marginTop: 'auto',
    },
    resetButtonLabel: {
        fontFamily: 'Orbitron-ExtraBold',
    },
    passwordSwitchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 5,
    },
});

export default CreateLobbyModal;