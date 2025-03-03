import { useState, useRef, useCallback } from 'react';
import { getToken } from '../../shared/states/api';
import { ToastService } from '../ToastService';
import { storage } from '../../utils/storage';

const useBingoWebSocketConnection = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [connectionError, setConnectionError] = useState(null);
    const wsRef = useRef(null);
    const tokenRef = useRef(null);
    const lastLobbyCodeRef = useRef(null);

    const clearLastLobbyCode = useCallback(async () => {
        try {
            await storage.delete('lastLobbyCode');
            lastLobbyCodeRef.current = null;
            console.log("Last lobby code cleared from MMKV.");
        } catch (error) {
            console.error("MMKV error clearing last lobby code:", error);
        }
    }, []);

    const connectWebSocket = useCallback(async (lobbyCode) => {
        if (!lobbyCode) {
            console.log("useWebSocketConnection: Lobby Code is missing for connection.");
            return;
        }

        const token = getToken();
        if (!token) {
            console.log("useWebSocketConnection: JWT token not found.");
            ToastService.show('error', 'Kimlik doğrulama için token bulunamadı.');
            return;
        }
        tokenRef.current = token;
        lastLobbyCodeRef.current = lobbyCode;

        const wsURL = `ws://10.0.2.2:3000/bingoGame?lobbyCode=${lobbyCode}&token=${token}`;
        console.log("WebSocket'e bağlanılıyor:", wsURL);

        setConnectionError(null);
        setIsConnected(false);
        setMessages([]);

        wsRef.current = new WebSocket(wsURL);

        wsRef.current.onopen = async () => {
            console.log("WebSocket bağlantısı açıldı.");
            setIsConnected(true);
            // sendMessage function will be available from the hook return
            // sendMessage({ type: 'system', message: 'Bağlantı kuruldu' }); // moved to component using hook if needed on open
            try {
                await storage.set('lastLobbyCode', lobbyCode);
            } catch (error) {
                console.error("MMKV error storing lobby code:", error);
            }
        };

        wsRef.current.onmessage = (event) => {
            try {
                const messageData = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, messageData]);
                console.log("WebSocket mesajı alındı:", messageData);

                if (messageData.type === 'user-joined') {
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
                        clearLastLobbyCode();
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
            clearLastLobbyCode();
        };

        wsRef.current.onclose = async () => {
            console.log("WebSocket bağlantısı kapandı.");
            setIsConnected(false);
            wsRef.current = null;
            setMessages((prevMessages) => [...prevMessages, { type: 'system', message: 'Bağlantı kapatıldı.' }]);
        };
    }, []); // Removed sendMessage from dependency, it will be returned from hook

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
            setMessages([]); // clearMessages is in component now if needed
            console.log("WebSocket bağlantısı manuel olarak kapatıldı.");
            await clearLastLobbyCode();
        }
    }, [clearLastLobbyCode]);

    return {
        isConnected,
        messages,
        connectionError,
        connectWebSocket,
        sendMessage,
        closeWebSocket,
        setMessages, // Expose setMessages if component needs direct message state manipulation
    };
};

export default useBingoWebSocketConnection;