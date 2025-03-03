import { createContext, useContext } from 'react';

export const BingoWebSocketContext = createContext();

export const useBingoWebSocket = () => {
    const context = useContext(BingoWebSocketContext);
    if (!context) {
        throw new Error("useBingoWebSocket must be used within a BingoWebSocketProvider");
    }
    return context;
};