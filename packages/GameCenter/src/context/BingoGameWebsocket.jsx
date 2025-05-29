import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import navigationService from "../shared/states/navigationService";
import { useTranslation } from "react-i18next";
import { Vibration } from "react-native";
import { getToken } from "../shared/states/api";
import { baseURL } from "../utils/baseUrl";
import { storage } from "../utils/storage";
import { ToastService } from "./ToastService";

export const BingoWebSocketContext = createContext();

export const BingoWebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [connectionError, setConnectionError] = useState(null);
    const wsRef = useRef(null);
    const tokenRef = useRef(null);
    const lastLobbyCodeRef = useRef(null);
    const { t } = useTranslation();

    const connectWebSocket = useCallback(async (lobbyCode) => {
        const token = getToken();
        if (!token) {
            return;
        }
        tokenRef.current = token;

        const wsURL = `ws://${baseURL}/bingoGame?lobbyCode=${lobbyCode}&token=${token}`;

        setConnectionError(null);
        setIsConnected(false);
        setMessages([]);

        wsRef.current = new WebSocket(wsURL);
        lastLobbyCodeRef.current = lobbyCode;
        storage.set('bingoLobbyCode', lobbyCode);

        wsRef.current.onopen = () => {
            setIsConnected(true);
        };

        wsRef.current.onmessage = (event) => {
            try {
                const messageData = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, messageData]);
                if (messageData.type === 'game-data') {
                    if (messageData.gameData && messageData.gameData.gameStarted) {
                        navigationService.navigate('BingoScreen');
                        ToastService.show('info', `${username} ${t('bingoGame.navigateback')}`);
                    }
                } else if (messageData.type === 'user-connected') {
                    const username = messageData.username || messageData.userName || 'User';
                    Vibration.vibrate(100);
                } else if (messageData.type === 'user-disconnected') {
                    const username = messageData.username || messageData.userName || 'User';
                    Vibration.vibrate(100);
                    ToastService.show('info', `${username} ${t('bingoGame.leftTheLobby')}`);
                } else if (messageData.type === 'game-started') {
                    Vibration.vibrate(300);
                }
            } catch (error) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: 'error', message: 'Error processing message', rawData: event.data }
                ]);
            }
        };

        wsRef.current.onerror = (error) => {
            setIsConnected(false);
            setConnectionError(error);
            if (wsRef.current) {
                 wsRef.current.close();
            }
            wsRef.current = null;
            storage.delete('bingoLobbyCode');
        };

        wsRef.current.onclose = () => {
            setIsConnected(false);
            wsRef.current = null;
            storage.delete('bingoLobbyCode');
            setMessages((prevMessages) => [...prevMessages, { type: 'system', message: 'Connection closed.' }]);
        };
    }, [t]);

    const sendMessage = useCallback((message) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const messageString = JSON.stringify(message);
            wsRef.current.send(messageString);
        }
    }, []);

    const closeWebSocket = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
            clearMessages();
            storage.delete('bingoLobbyCode');
        }
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    useEffect(() => {
        const storedLobbyCode = storage.getString('bingoLobbyCode');
        if (storedLobbyCode) {
            connectWebSocket(storedLobbyCode);
        }
    }, [connectWebSocket]);

    const contextValue = {
        socket: wsRef.current,
        isConnected,
        messages,
        connectionError,
        sendMessage,
        closeWebSocket,
        connectWebSocket,
        clearMessages,
    };

    return (
        <BingoWebSocketContext.Provider value={contextValue}>
            {children}
        </BingoWebSocketContext.Provider>
    );
};

export const useBingoWebSocket = () => {
    const context = useContext(BingoWebSocketContext);
     if (context === undefined) {
        throw new Error('useBingoWebSocket must be used within a BingoWebSocketProvider');
    }
    return context;
};