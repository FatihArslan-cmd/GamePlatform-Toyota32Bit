import React, { createContext, useState, useRef, useCallback ,useContext, useEffect} from 'react';
import { getToken } from '../shared/states/api';
import { ToastService } from './ToastService';
import { storage } from '../utils/storage';

export const BingoWebSocketContext = createContext();

export const BingoWebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [connectionError, setConnectionError] = useState(null);
    const wsRef = useRef(null);
    const tokenRef = useRef(null);
    const lastLobbyCodeRef = useRef(null);

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

        const wsURL = `ws://10.0.2.2:3000/bingoGame?lobbyCode=${lobbyCode}&token=${token}`;
        console.log("WebSocket'e bağlanılıyor:", wsURL);

        setConnectionError(null);
        setIsConnected(false);
        setMessages([]);

        wsRef.current = new WebSocket(wsURL);
        lastLobbyCodeRef.current = lobbyCode;
        storage.set('bingoLobbyCode', lobbyCode); // MMKV: Lobi kodunu kaydet

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
                    const username = messageData.username || messageData.userName || 'Kullanıcı'; // Assuming username or userName field
                    ToastService.show('success', `${username} joined the lobby`);
                } else if (messageData.type === 'user-disconnected') {
                    const username = messageData.username  || messageData.userName || 'Kullanıcı'; // Assuming username or userName field
                    ToastService.show('info', `${username} left the lobby`);
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
            storage.delete('bingoLobbyCode'); // MMKV: Hata olursa lobi kodunu sil
            ToastService.show('error', 'WebSocket bağlantı hatası.');
        };

        wsRef.current.onclose = () => {
            console.log("WebSocket bağlantısı kapandı.");
            setIsConnected(false);
            wsRef.current = null;
            storage.delete('bingoLobbyCode'); // MMKV: Bağlantı kapanınca lobi kodunu sil
            setMessages((prevMessages) => [...prevMessages, { type: 'system', message: 'Bağlantı kapatıldı.' }]);
        };
    }, [sendMessage]);


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

    const closeWebSocket = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close();
            clearMessages();
            storage.delete('bingoLobbyCode'); // MMKV: Manuel kapatmada lobi kodunu sil
            console.log("WebSocket bağlantısı manuel olarak kapatıldı.");
        }
    }, [clearMessages]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        console.log("WebSocket messages cleared.");
    }, []);

    useEffect(() => {
        const storedLobbyCode = storage.getString('bingoLobbyCode'); // MMKV: Lobi kodunu al
        if (storedLobbyCode) {
            console.log("MMKV'de lobi kodu bulundu, otomatik bağlanma deneniyor:", storedLobbyCode);
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