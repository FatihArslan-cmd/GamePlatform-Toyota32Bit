import React, { createContext, useState, useCallback } from 'react';
import { ToastService } from '../../../../../context/ToastService';
import { createLobby } from '../service/service';
import { useBingoWebSocket } from '../../../../../context/BingoGameWebsocket';

export const CreateLobbyContext = createContext();

export const CreateLobbyProvider = ({ children }) => {
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
            connectWebSocket(data.lobby.code);
            setCode(`${data.lobby.code}`);
            setIsCodeGenerated(true);
        } catch (error) {
            ToastService.show("error", error.message);
        }
    }, [lobbyName, lobbyType, gameName, password, maxCapacity, hasPassword, startDate, endDate, connectWebSocket]);

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

    const contextValue = {
        lobbyType, setLobbyType,
        lobbyName, setLobbyName,
        gameName, setGameName,
        maxCapacity, setMaxCapacity,
        password, setPassword,
        code, setCode,
        error, setError,
        isPasswordVisible, setIsPasswordVisible,
        isCodeGenerated, setIsCodeGenerated,
        hasPassword, setHasPassword,
        startDate, setStartDate,
        endDate, setEndDate,
        toggleLobbyType,
        handleSave,
        resetLobby,
    };

    return (
        <CreateLobbyContext.Provider value={contextValue}>
            {children}
        </CreateLobbyContext.Provider>
    );
};