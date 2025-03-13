import React, { createContext, useState, useContext, useEffect } from 'react';
import lobbyService from '../service/service';
import { ToastService } from '../../../context/ToastService'; // Adjust path if needed
import { useBingoWebSocket } from '../../../context/BingoGameWebsocket.js';
const LobbyInviteContext = createContext();

const LobbyInviteProvider = ({ children }) => {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { connectWebSocket } = useBingoWebSocket(); // messages eklendi

    useEffect(() => {
        const fetchInvitations = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await lobbyService.getLobbyInvites();
                setInvitations(data.invitations); // Assuming your API response is like the provided JSON
            } catch (err) {
                setError(err.message);
                ToastService.show('error', 'Davetler alınırken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchInvitations();
    }, []);

    const handleAcceptInvite = async (lobbyCode) => {
        try {
            setLoading(true); // Start loading when accepting
            await lobbyService.acceptLobbyInvite(lobbyCode);
            connectWebSocket(lobbyCode);
            setInvitations(prevInvitations =>
                prevInvitations.filter(invite => invite.lobbyCode !== lobbyCode) // Optimistically remove from list
            );
            ToastService.show('success', 'Davet kabul edildi!');
        } catch (err) {
            setError(err.message);
            ToastService.show('error', 'Davet kabul edilirken bir hata oluştu.');
            console.error("Accept invite error:", err);
        } finally {
            setLoading(false); // End loading regardless of success/failure
        }
    };

    const handleRejectInvite = async (lobbyCode) => {
        try {
            setLoading(true); // Start loading when rejecting
            await lobbyService.rejectLobbyInvite(lobbyCode);
            setInvitations(prevInvitations =>
                prevInvitations.filter(invite => invite.lobbyCode !== lobbyCode) // Optimistically remove from list
            );
            ToastService.show('info', 'Davet reddedildi.');
        } catch (err) {
            setError(err.message);
            ToastService.show('error', 'Davet reddedilirken bir hata oluştu.');
            console.error("Reject invite error:", err);
        } finally {
            setLoading(false); // End loading regardless of success/failure
        }
    };

    const contextValue = {
        invitations,
        loading,
        error,
        handleAcceptInvite,
        handleRejectInvite,
    };

    return (
        <LobbyInviteContext.Provider value={contextValue}>
            {children}
        </LobbyInviteContext.Provider>
    );
};

const useLobbyInvite = () => {
    const context = useContext(LobbyInviteContext);
    if (!context) {
        throw new Error("useLobbyInvite must be used within a LobbyInviteProvider");
    }
    return context;
};

export { LobbyInviteProvider, useLobbyInvite };