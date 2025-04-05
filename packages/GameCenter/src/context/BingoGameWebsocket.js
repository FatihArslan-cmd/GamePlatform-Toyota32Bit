import React, { createContext, useState, useRef, useCallback ,useContext, useEffect} from 'react';
import { getToken } from '../shared/states/api';
import { ToastService } from './ToastService';
import { storage } from '../utils/storage';
import {useTranslation} from 'react-i18next';
import { Vibration } from 'react-native';

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

        const wsURL = `ws://10.0.2.2:3000/bingoGame?lobbyCode=${lobbyCode}&token=${token}`;

        setConnectionError(null);
        setIsConnected(false);
        setMessages([]);

        wsRef.current = new WebSocket(wsURL);
        lastLobbyCodeRef.current = lobbyCode;
        storage.set('bingoLobbyCode', lobbyCode);

        wsRef.current.onopen = () => {
            console.log("WebSocket bağlantısı açıldı.");
            setIsConnected(true);
            sendMessage({ type: 'system', message: 'Bağlantı kuruldu' });
        };

        wsRef.current.onmessage = (event) => {
            try {
                const messageData = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, messageData]);
                console.log("WebSocket mesajı alındı:", messageData);
                
                if (messageData.type === 'user-connected') {
                    const username = messageData.username || messageData.userName || 'Kullanıcı';
                    ToastService.show('success', `${username} ${t('bingoGame.joinedTheLobby')}`);
                } else if (messageData.type === 'user-disconnected') {
                    const username = messageData.username || messageData.userName || 'Kullanıcı';
                    ToastService.show('info', `${username} ${t('bingoGame.leftTheLobby')}`);
                } else if (messageData.type === 'game-started') {
                    Vibration.vibrate(300); 
                    console.log("Vibration triggered for game start.");
                }
            } catch (error) {
                setMessages((prevMessages) => [
                    ...prevMessages, 
                    { type: 'error', message: 'Mesaj işlenirken hata oluştu', rawData: event.data }
                ]);
            }
        };
        
        wsRef.current.onerror = (error) => {
            console.error("WebSocket hatası:", error);
            setIsConnected(false);
            setConnectionError(error);
            wsRef.current = null;
            storage.delete('bingoLobbyCode');
        };

        wsRef.current.onclose = () => {
            setIsConnected(false);
            wsRef.current = null;
            storage.delete('bingoLobbyCode');
            setMessages((prevMessages) => [...prevMessages, { type: 'system', message: 'Bağlantı kapatıldı.' }]);
        };
    }, [sendMessage, t]);


    const sendMessage = useCallback((message) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const messageString = JSON.stringify(message);
            wsRef.current.send(messageString);
            console.log("WebSocket mesajı gönderildi:", messageString);
        }
    }, []);

    const closeWebSocket = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
            clearMessages();
            storage.delete('bingoLobbyCode');
            console.log("WebSocket bağlantısı manuel olarak kapatıldı.");
        }
    }, [clearMessages]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        console.log("WebSocket messages cleared.");
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
        clearMessages
    };

    return (
        <BingoWebSocketContext.Provider value={contextValue}>
            {children}
        </BingoWebSocketContext.Provider>
    );
};

export const useBingoWebSocket = () => {
    const context = useContext(BingoWebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a BingoWebSocketProvider");
    }
    return context;
};