import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getToken } from '../../../shared/states/api';
import { ToastService } from '../../../context/ToastService';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const socket = useRef(null);
    const [userId, setUserId] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket('ws://10.0.2.2:3000/friendchat');
        socket.current = ws;
        const accessToken = getToken();

        ws.onopen = () => {
            console.log('WebSocket connected');
            ws.send(JSON.stringify({
                type: 'auth',
                token: accessToken,
            }));
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'connected') {
                    console.log('WebSocket authenticated');
                    console.log('Authenticated User ID:', message.payload.userId);
                    setUserId(message.payload.userId);
                } else if (message.type === 'error') {
                    console.error('WebSocket Error:', message.message);
                    ToastService.show('error', message.message);
                }
            } catch (error) {
                console.error('Failed to parse message:', error);
                ToastService.show('error', 'Failed to process WebSocket message.');
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ToastService.show('error', 'Failed to connect to chat server.');
            setIsConnected(false);
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
            setIsConnected(false);
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    const sendMessage = (payload) => {
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify(payload));
        }
    };

    const subscribeToMessages = (callback) => {
        if (socket.current) {
            socket.current.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    callback(message);
                } catch (error) {
                    console.error('Failed to parse message:', error);
                }
            };
        }
    };

    return (
        <WebSocketContext.Provider value={{ userId, isConnected, sendMessage, subscribeToMessages }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};