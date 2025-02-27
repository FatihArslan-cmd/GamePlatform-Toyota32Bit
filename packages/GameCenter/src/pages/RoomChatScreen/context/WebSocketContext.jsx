import React, { createContext, useState, useRef, useEffect, useCallback, useContext } from 'react';
import { getToken } from '../../../shared/states/api';
import { ToastService } from '../../../context/ToastService';

const WebSocketContext = createContext();

const WebSocketProvider = ({ children, roomId }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const ws = useRef(null);
    const userId = useRef(null);

    useEffect(() => {
        if (!roomId) {
            console.log("WebSocketContext: Oda ID yok.");
            return;
        }

        const websocketURL = `ws://10.0.2.2:3000/roomchat?roomId=${roomId}`;
        ws.current = new WebSocket(websocketURL);

        ws.current.onopen = () => {
            console.log('WebSocketContext: WebSocket connected');
            setIsConnected(true);
            const accessToken = getToken();
            if (accessToken) {
                ws.current.send(JSON.stringify({
                    type: 'auth',
                    token: accessToken,
                }));
            } else {
                console.log("WebSocketContext: JWT token bulunamadı.");
                ToastService.show('error', 'Kimlik doğrulama için token bulunamadı.');
                ws.current.close();
            }
        };

        ws.current.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                console.log('WebSocketContext: Mesaj alındı', message);

                if (message.type === 'auth-success') {
                    userId.current = message.userId;
                    console.log(`WebSocketContext: Kimlik doğrulama başarılı, Kullanıcı ID: ${message.userId}`);
                } else if (message.type === 'message') {
                    const newMessage = {
                        senderId: message.senderId,
                        content: message.text,
                        timestamp: message.timestamp,
                        senderUsername: message.senderUsername,
                        senderProfilePhoto: message.senderProfilePhoto, // Profil fotoğrafını al
                    };
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                } else if (message.type === 'error') {
                    console.error('WebSocketContext: WebSocket Error:', message.message);
                    ToastService.show('error', `Chat Error: ${message.message}`);
                }
            } catch (error) {
                console.error('WebSocketContext: Mesaj ayrıştırma hatası:', error);
                ToastService.show('error', 'Mesaj işlenirken hata oluştu.');
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocketContext: WebSocket error:', error);
            setIsConnected(false);
        };

        ws.current.onclose = () => {
            console.log('WebSocketContext: WebSocket bağlantısı kapatıldı');
            setIsConnected(false);
        };

        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, [roomId]);

    const sendMessage = useCallback((text) => {
        if (text && isConnected && ws.current) {
            const messagePayload = {
                type: 'message',
                text: text,
            };
            ws.current.send(JSON.stringify(messagePayload));
        } else if (!isConnected) {
            ToastService.show('error', 'Sohbet sunucusuna bağlı değil.');
        }
    }, [isConnected]);

    const contextValue = {
        isConnected,
        messages,
        setMessages,
        sendMessage,
        userId: userId.current,
    };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};

const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};

export { WebSocketProvider, useWebSocket };