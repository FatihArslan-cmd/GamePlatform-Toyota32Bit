import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Switch, Text } from 'react-native-paper'; // Switch ve Text'i import et
import BottomSheet from '../../../../components/BottomSheet';
import LobbyTypeSelector from './LobbyTypeSelector';
import CustomDateTimeSelector from './DateTimeSelector';
import GameSelector from './GameSelector';
import PasswordInput from './PasswordInput';
import InvitationLink from './InvitationLink';
import { ToastService } from '../../../../context/ToastService';
import { createLobby } from './service/service';

const CreateLobbyModal = ({ visible, onDismiss,routeGameName }) => {
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


    const toggleLobbyType = useCallback(() => {
        setLobbyType((current) => (current === 'Normal' ? 'Event' : 'Normal'));
    }, []);


    const handleSave = useCallback(async () => {
        if (!lobbyName.trim()) {
            ToastService.show("error", 'Lobby name cannot be empty');
            return;
        }
        if (!gameName.trim()) {
            ToastService.show("error", 'Game name cannot be empty');
            return;
        }
        if (!maxCapacity.trim()) {
            ToastService.show("error", 'Max capacity cannot be empty');
            return;
        }

        if (hasPassword && !password.trim()) {
            ToastService.show("error", "Password cannot be empty for a password-protected lobby.");
            return;
        }

        if (lobbyType === 'Event' && (!startDate || !endDate)) {
            ToastService.show("error", "Event lobbies require start and end date.");
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
            console.log(data);
            setCode(`${data.lobby.code}`);
            setIsCodeGenerated(true);
            ToastService.show("success", "Lobby created successfully!");
        } catch (error) {
            ToastService.show("error", error.message);
        }
    }, [lobbyName, lobbyType, gameName, password, maxCapacity, hasPassword, startDate, endDate]);

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
    }, [gameName]);

    const handleDismiss = useCallback(() => {
        resetLobby();
        onDismiss();
    }, [onDismiss, resetLobby]);


    const bottomSheetHeight = isCodeGenerated ? '50%' : (lobbyType === 'Normal' ? '50%' : '70%'); // Dynamic height calculation

    return (
        <BottomSheet
            visible={visible}
            onDismiss={handleDismiss}
            title="Create Lobby"
            height={bottomSheetHeight}
            backgroundColor="white"
        >
            <View style={styles.container}>
                {!isCodeGenerated ? (
                    <>
                        <LobbyTypeSelector lobbyType={lobbyType} onToggle={toggleLobbyType} />
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
                            />
                        )}
                        <GameSelector
                            gameName={gameName}
                            lobbyName={lobbyName}
                            maxCapacity={maxCapacity}
                            onGameNameChange={setGameName}
                            onLobbyNameChange={setLobbyName}
                            onMaxCapacityChange={setMaxCapacity}
                        />
                    <PasswordInput
                      password={password}
                      isPasswordVisible={isPasswordVisible}
                      onPasswordChange={setPassword}
                      onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
                      hasPassword={hasPassword}
                      onPasswordToggle={setHasPassword}
                       />
                        <Button
                            mode="contained"
                            onPress={handleSave}
                            style={[
                                styles.createButton,
                                isCodeGenerated && styles.createButtonWithLink,
                            ]}
                            contentStyle={styles.createButtonContent}
                            icon="plus-circle"
                        >
                            Create Lobby
                        </Button>
                    </>
                ) : (
                    <View style={styles.successContainer}>
                        <InvitationLink code={code} />
                        <Button
                            mode="outlined"
                            onPress={resetLobby}
                            style={styles.resetButton}
                            icon="refresh"
                        >
                            Create New Lobby
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
        paddingVertical: 8,
    },
    createButtonWithLink: {
        marginTop: 16,
    },
    createButtonContent: {
        height: 48,
    },
    resetButton: {
        marginTop: 'auto',
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