import React, { useCallback, useEffect, useRef } from 'react'; // Keep useRef
import { BingoWebSocketContext } from './BingoWebSocket';
import useWebSocketConnection from './useWebSocketConnection';
import { getStoredLobbyCode } from './lobbyStorage';

export const BingoWebSocketProvider = ({ children }) => {
    const {
        isConnected,
        messages,
        connectionError,
        connectWebSocket,
        sendMessage,
        closeWebSocket,
        setMessages,
    } = useWebSocketConnection();

    const wsRef = useRef(null); // Keep wsRef here if you still need to expose it in contextValue

    const clearMessages = useCallback(() => {
        setMessages([]);
        console.log("WebSocket messages cleared from Provider.");
    }, [setMessages]);


    useEffect(() => {
        const reconnectToLastLobby = async () => {
            const lastLobbyCode = await getStoredLobbyCode();
            if (lastLobbyCode) {
                console.log("Uygulama açılışında son lobi kodu bulundu (Provider):", lastLobbyCode);
                connectWebSocket(lastLobbyCode);
            }
        };

        reconnectToLastLobby();
    }, [connectWebSocket]);

    const contextValue = {
        isConnected,
        messages,
        connectionError,
        sendMessage,
        closeWebSocket,
        connectWebSocket,
        clearMessages,
        socket: wsRef?.current, // If you still need to expose socket ref
    };

    return (
        <BingoWebSocketContext.Provider value={contextValue}>
            {children}
        </BingoWebSocketContext.Provider>
    );
};