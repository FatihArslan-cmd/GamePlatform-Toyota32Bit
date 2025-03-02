import React, { createContext, useState, useRef, useCallback ,useContext, useEffect} from 'react';
import { getToken } from '../../shared/states/api';
import { ToastService } from '../ToastService';
import { storage } from '../../utils/storage';

export const BingoWebSocketContext = createContext();

export const BingoWebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [connectionError, setConnectionError] = useState(null);
    const wsRef = useRef(null);
    const tokenRef = useRef(null);
    const lastLobbyCodeRef = useRef(null); // Ref to hold last lobby code

    const connectWebSocket = useCallback(async (lobbyCode) => {
        if (!lobbyCode) {
            console.log("WebSocketContext: Lobby Code is missing for connection.");
            return;
        }

        const token = getToken();
        if (!token) {
            console.log("WebSocketContext: JWT token not found.");
            ToastService.show('error', 'Kimlik doğrulama için token bulunamadı.');
            return;
        }
        tokenRef.current = token;
        lastLobbyCodeRef.current = lobbyCode; // Store lobby code in ref

        const wsURL = `ws://10.0.2.2:3000/bingoGame?lobbyCode=${lobbyCode}&token=${token}`;
        console.log("WebSocket'e bağlanılıyor:", wsURL);

        setConnectionError(null);
        setIsConnected(false);
        setMessages([]);

        wsRef.current = new WebSocket(wsURL);

        wsRef.current.onopen = async () => {
            console.log("WebSocket bağlantısı açıldı.");
            setIsConnected(true);
            sendMessage({ type: 'system', message: 'Bağlantı kuruldu' });
            try {
                await storage.set('lastLobbyCode', lobbyCode); // Persist lobby code
            } catch (error) {
                console.error("MMKV error storing lobby code:", error);
            }
        };

        wsRef.current.onmessage = (event) => {
            try {
                const messageData = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, messageData]);
                console.log("WebSocket mesajı alındı:", messageData);

                if (messageData.type === 'game-started') {
                    console.log("Oyun başladı mesajı alındı, navigasyon tetiklenecek.");
                    // Navigation should be handled in the component that consumes this context.
                    // We can pass a flag or a function to signal the consumer.
                    // For simplicity, let's add a 'gameStarted' flag to the context.
                } else if (messageData.type === 'user-joined') {
                    const username = messageData.username;
                    if (username) {
                        ToastService.show('success', `${username.toUpperCase()} joined the lobby`);
                    }
                } else if (messageData.type === 'user-left') {
                    const username = messageData.username;
                    if (username) {
                        ToastService.show('info', `${username.toUpperCase()} left the lobby`);
                    }
                } else if (messageData.type === 'error') {
                    if (messageData.message === 'Lobby bulunamadı veya üye değilsiniz') {
                        clearLastLobbyCode(); // Clear persisted lobby code if lobby is invalid
                    }
                }


            } catch (error) {
                console.error("WebSocket mesajı işlenirken hata:", error, event.data);
                setMessages((prevMessages) => [...prevMessages, { type: 'error', message: 'Mesaj işlenirken hata oluştu', rawData: event.data }]);
                ToastService.show('error', 'Mesaj işlenirken hata oluştu.');
            }
        };

        wsRef.current.onerror = (error) => {
            console.error("WebSocket hatası:", error);
            setIsConnected(false);
            setConnectionError(error);
            wsRef.current = null;
            ToastService.show('error', 'WebSocket bağlantı hatası.');
            clearLastLobbyCode(); // Clear persisted lobby code on error
        };

        wsRef.current.onclose = async () => {
            console.log("WebSocket bağlantısı kapandı.");
            setIsConnected(false);
            wsRef.current = null;
            setMessages((prevMessages) => [...prevMessages, { type: 'system', message: 'Bağlantı kapatıldı.' }]);
        };
    }, [sendMessage]);

    const clearLastLobbyCode = useCallback(async () => {
        try {
            await storage.delete('lastLobbyCode'); // Use delete for MMKV
            lastLobbyCodeRef.current = null;
            console.log("Last lobby code cleared from MMKV.");
        } catch (error) {
            console.error("MMKV error clearing last lobby code:", error);
        }
    }, []);


    const sendMessage = useCallback((message) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const messageString = JSON.stringify(message);
            wsRef.current.send(messageString);
            console.log("WebSocket mesajı gönderildi:", messageString);
        } else {
            console.error("WebSocket bağlantısı açık değil. Mesaj gönderilemedi.");
            ToastService.show('error', 'Sohbet sunucusuna bağlı değil.');
        }
    }, []);

    const closeWebSocket = useCallback(async () => {
        if (wsRef.current) {
            wsRef.current.close();
            clearMessages();
            console.log("WebSocket bağlantısı manuel olarak kapatıldı.");
            await clearLastLobbyCode(); // Clear lobby code when manually closing
        }
    }, [clearLastLobbyCode, clearMessages]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        console.log("WebSocket messages cleared.");
    }, []);

    useEffect(() => {
        const reconnectToLastLobby = async () => {
            try {
                const lastLobbyCode = storage.getString('lastLobbyCode'); // Use getString for MMKV
                if (lastLobbyCode) {
                    console.log("Uygulama açılışında son lobi kodu bulundu:", lastLobbyCode);
                    connectWebSocket(lastLobbyCode); // Attempt to reconnect
                }
            } catch (error) {
                console.error("MMKV error retrieving last lobby code:", error);
            }
        };

        reconnectToLastLobby();
    }, [connectWebSocket]); // Depend on connectWebSocket to ensure it's up-to-date


    const contextValue = {
        socket: wsRef.current,
        isConnected,
        messages,
        connectionError,
        sendMessage,
        closeWebSocket,
        connectWebSocket,
        clearMessages,
        clearLastLobbyCode // Expose clearLastLobbyCode if needed elsewhere
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
