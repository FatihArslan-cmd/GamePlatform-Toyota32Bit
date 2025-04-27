import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { ToastService } from "../../../context/ToastService";
import { getToken } from "../../../shared/states/api";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const socket = useRef(null);
    const messageListeners = useRef(new Set());
    const reconnectTimeout = useRef(null);
    const isUnmounted = useRef(false);
    const messageQueue = useRef([]);
    
    const [state, setState] = useState({
        userId: null,
        isConnected: false,
        connectionStatus: 'disconnected' 
    });

    const updateState = (newState) => {
        if (!isUnmounted.current) {
            setState(prev => ({ ...prev, ...newState }));
        }
    };

    const connectWebSocket = () => {
        if (isUnmounted.current) return;

        updateState({ connectionStatus: 'connecting' });
        
        const ws = new WebSocket('ws://192.168.1.105:3000/friendchat');
        socket.current = ws;
        const accessToken = getToken();

        ws.onopen = () => {
            if (isUnmounted.current) return;
            ws.send(JSON.stringify({
                type: 'auth',
                token: accessToken,
            }));
            updateState({ isConnected: true, connectionStatus: 'connected' });
        };

        ws.onmessage = (event) => {
            if (isUnmounted.current) return;
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'connected') {
                    updateState({ userId: message.payload.userId });
                }
                messageListeners.current.forEach(callback => callback(message));
            } catch (error) {
                console.error('Message parse error:', error);
                ToastService.show('error', 'Invalid message format');
            }
        };

        ws.onerror = (error) => {
            if (isUnmounted.current) return;
            console.error('WebSocket error:', error);
            ToastService.show('error', 'Connection error');
            updateState({ isConnected: false, connectionStatus: 'error' });
        };

        ws.onclose = (event) => {
            if (isUnmounted.current) return;
            console.log('WebSocket closed:', event.code, event.reason);
            
            updateState({ 
                isConnected: false, 
                connectionStatus: state.connectionStatus === 'connected' ? 'reconnecting' : 'disconnected'
            });

            if (!isUnmounted.current && event.code !== 1000) {
                reconnectTimeout.current = setTimeout(() => {
                    connectWebSocket();
                }, 5000);
            }
        };

        return ws;
    };

    const sendMessage = (payload) => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify(payload));
            while (messageQueue.current.length > 0) {
                const msg = messageQueue.current.shift();
                socket.current.send(JSON.stringify(msg));
            }
        } else {
            messageQueue.current.push(payload);
            if (messageQueue.current.length > 5) {
                ToastService.show('warning', 'Messages are queued. Trying to reconnect...');
                connectWebSocket();
            }
        }
    };

    const subscribeToMessages = (callback) => {
        messageListeners.current.add(callback);
        return () => messageListeners.current.delete(callback);
    };

    useEffect(() => {
        isUnmounted.current = false;
        const ws = connectWebSocket();

        return () => {
            isUnmounted.current = true;
            
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
            
            if (ws && ws.readyState !== WebSocket.CLOSED) {
                ws.close(1000, 'Normal closure');
            }
            
            socket.current = null;
            messageListeners.current.clear();
            messageQueue.current = [];
        };
    }, []);

    return (
        <WebSocketContext.Provider
            value={{
                userId: state.userId,
                isConnected: state.isConnected,
                connectionStatus: state.connectionStatus,
                sendMessage,
                subscribeToMessages
            }}
        >
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