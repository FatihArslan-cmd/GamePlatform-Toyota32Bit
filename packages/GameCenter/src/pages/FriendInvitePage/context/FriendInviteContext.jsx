import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchFriends } from '../../ProfileScreen/services/service';
import lobbyService from '../../HomeScreen/components/Header/services/lobbyService';
import { ToastService } from '../../../context/ToastService';

const FriendInviteContext = createContext();

const FriendInviteProvider = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userLobby, setUserLobby] = useState(null);
    const [lobbyLoading, setLobbyLoading] = useState(true);
    const [lobbyError, setLobbyError] = useState('');
    const [noLobbyError, setNoLobbyError] = useState(false);

    useEffect(() => {
        const loadFriendsAndLobby = async () => {
            setLoading(true);
            setLobbyLoading(true);
            setError('');
            setLobbyError('');
            setNoLobbyError(false);
            setUserLobby(null);
            setFriends([]);

            try {
                const lobbyData = await lobbyService.getUserLobby();
                setUserLobby(lobbyData);

                if (lobbyData) {
                    try {
                        const friendsData = await fetchFriends();
                        setFriends(friendsData.friends);
                    } catch (err) {
                        setError(err.message);
                    }
                } else {
                    setNoLobbyError(true);
                    ToastService.show('info', 'Arkadaşları davet etmeden önce bir lobiye katılın.');
                }
            } catch (err) {
                setLobbyError(err.message);
            } finally {
                setLoading(false);
                setLobbyLoading(false);
            }
        };

        loadFriendsAndLobby();
    }, []);

    const handleInvite = async (friendId) => {
        if (!userLobby) {
            ToastService.show('error', 'Lobi bilgisi alınamadı, lütfen tekrar deneyin.');
            return;
        }
    
        try {
            await lobbyService.inviteFriendToLobby(friendId, userLobby.code);
            ToastService.show('success', 'Arkadaş davet isteği başarıyla gönderildi!'); 
        } catch (err) {
            if (err.response && err.response.status === 400 && err.response.data && err.response.data.message === 'Invited user is already in the lobby') { 
                ToastService.show('warning', 'Bu arkadaşınız zaten lobide.'); 
            } else if (err.response && err.response.status === 400 && err.response.data && err.response.data.message === 'Invitation already sent to this user for this lobby') {
                ToastService.show('warning', 'Bu arkadaşınıza zaten bu lobi için davet gönderdiniz.'); 
            }
             else {
                ToastService.show('error', 'Arkadaş davet isteği gönderilirken bir hata oluştu.'); 
                setError(err.message); 
                console.error("Davet hatası:", err); 
            }
        }
    };

    const contextValue = {
        friends,
        loading,
        error,
        userLobby,
        lobbyLoading,
        lobbyError,
        noLobbyError,
        handleInvite,
    };

    return (
        <FriendInviteContext.Provider value={contextValue}>
            {children}
        </FriendInviteContext.Provider>
    );
};

const useFriendInvite = () => {
    const context = useContext(FriendInviteContext);
    if (!context) {
        throw new Error("useFriendInvite must be used within a FriendInviteProvider");
    }
    return context;
};

export { FriendInviteProvider, useFriendInvite };