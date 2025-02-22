import React, { createContext, useContext, useRef, useEffect, useCallback } from 'react';
import { getToken } from '../../../shared/states/api.js';
import { ToastService } from '../../../context/ToastService.jsx';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const ws = useRef(null);
    const messageHandlers = useRef([]);

    const addMessageHandler = useCallback((handler) => {
        messageHandlers.current.push(handler);
    }, []);

    const removeMessageHandler = useCallback((handler) => {
        messageHandlers.current = messageHandlers.current.filter(h => h !== handler);
    }, []);

    const send = useCallback((message) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        }
    }, []);

    useEffect(() => {
        const accessToken = getToken();
        const newWs = new WebSocket('ws://10.0.2.2:3000');

        newWs.onopen = () => {
            newWs.send(JSON.stringify({
                type: 'auth',
                token: accessToken,
            }));
        };

        newWs.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                messageHandlers.current.forEach(handler => handler(message));
            } catch (error) {
                console.error('Failed to parse message:', error);
            }
        };

        newWs.onerror = (error) => {
            ToastService.show('error', 'WebSocket connection error');
            console.error('WebSocket error:', error);
        };

        newWs.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.current = newWs;

        return () => {
            if (newWs.readyState === WebSocket.OPEN) {
                newWs.close();
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ send, addMessageHandler, removeMessageHandler }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};