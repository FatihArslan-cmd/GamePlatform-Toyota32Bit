import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { createLobby } from "../screens/LobbyCreationModal/service/service";
import { isTablet } from "../utils/isTablet";
import { useBingoWebSocket } from "./BingoGameWebsocket";
import ToastService from "./ToastService";

const CreateLobbyContext = createContext(null);

export const useCreateLobby = () => {
    const context = useContext(CreateLobbyContext);
    if (!context) {
        throw new Error('useCreateLobby must be used within a CreateLobbyProvider');
    }
    return context;
};

export const CreateLobbyProvider = ({ children }) => {
    const [lobbyType, setLobbyType] = useState('Normal');
    const [lobbyName, setLobbyName] = useState('');
    const [gameName, setGameName] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState(''); // error state managed internally, toasts used for UI
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCodeGenerated, setIsCodeGenerated] = useState(false);
    const [hasPassword, setHasPassword] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const { connectWebSocket } = useBingoWebSocket();
    const { t } = useTranslation();

    const toggleLobbyType = useCallback(() => {
        setLobbyType((current) => (current === 'Normal' ? 'Event' : 'Normal'));
    }, []);

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
        setIsLoading(false); // Reset loading state
    }, []);

    const handleSave = useCallback(async () => {
        if (isLoading) return; // Prevent multiple clicks

        // Basic validation
        if (!lobbyName.trim()) {
            ToastService.show("error", t('createLobbyModal.toastMessages.emptyLobbyName'));
            return;
        }
        if (!gameName.trim()) {
            ToastService.show("error", t('createLobbyModal.toastMessages.emptyGameName'));
            return;
        }
        if (!maxCapacity.trim() || isNaN(parseInt(maxCapacity, 10)) || parseInt(maxCapacity, 10) <= 0) {
             ToastService.show("error", t('createLobbyModal.toastMessages.invalidMaxCapacity'));
             return;
         }

        if (hasPassword && !password.trim()) {
            ToastService.show("error", t('createLobbyModal.toastMessages.emptyPassword'));
            return;
        }

        if (lobbyType === 'Event') {
             if (!startDate || !endDate) {
                 ToastService.show("error", t('createLobbyModal.toastMessages.requireStartEndDate'));
                 return;
             }
             if (startDate >= endDate) {
                 ToastService.show("error", t('createLobbyModal.toastMessages.invalidDateRange'));
                 return;
             }
        }


        const requestBody = {
            lobbyName,
            lobbyType,
            gameName,
            maxCapacity: parseInt(maxCapacity, 10),
            password: hasPassword ? password : null,
            hasPassword: hasPassword,
            ...(lobbyType === 'Event' && { startDate: startDate.toISOString(), endDate: endDate.toISOString() }),
        };

        setIsLoading(true);
        setError(''); // Clear previous error
        try {
            const data = await createLobby(requestBody);
            if (data?.lobby?.code) {
                 connectWebSocket(data.lobby.code);
                 setCode(`${data.lobby.code}`);
                 setIsCodeGenerated(true);
                 // Optionally show success toast here
                 // ToastService.show("success", t('createLobbyModal.toastMessages.lobbyCreated'));
            } else {
                 // Handle unexpected response structure
                 setError('Failed to create lobby: Unexpected response');
                 ToastService.show("error", 'Failed to create lobby: Unexpected response');
            }
        } catch (err) {
            console.error("Create lobby failed:", err);
            const errorMessage = err.message || 'Failed to create lobby';
            setError(errorMessage);
            ToastService.show("error", t('createLobbyModal.toastMessages.creationError', { message: errorMessage }));
        } finally {
            setIsLoading(false);
        }
    }, [lobbyName, lobbyType, gameName, maxCapacity, password, hasPassword, startDate, endDate, isLoading, t, connectWebSocket]);

    // Use useMemo to memoize the context value
    const contextValue = useMemo(() => ({
        lobbyType, setLobbyType, toggleLobbyType,
        lobbyName, setLobbyName,
        gameName, setGameName,
        maxCapacity, setMaxCapacity,
        password, setPassword,
        code, // code is read-only after generation
        error, // error is read-only
        isPasswordVisible, setIsPasswordVisible,
        isCodeGenerated, // isCodeGenerated is read-only
        hasPassword, setHasPassword,
        startDate, setStartDate,
        endDate, setEndDate,
        isLoading, // isLoading is read-only
        handleSave,
        resetLobby, // Expose resetLobby for the modal's onDismiss
    }), [
        lobbyType, lobbyName, gameName, maxCapacity, password, code, error,
        isPasswordVisible, isCodeGenerated, hasPassword, startDate, endDate,
        isLoading, toggleLobbyType, handleSave, resetLobby
    ]);

    return (
        <CreateLobbyContext.Provider value={contextValue}>
            {children}
        </CreateLobbyContext.Provider>
    );
};