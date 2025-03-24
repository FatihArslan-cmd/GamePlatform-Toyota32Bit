import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchFriends } from '../../ProfileScreen/services/service'; // Adjust path if necessary

const FriendsContext = createContext();

const FriendsProvider = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFriends = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedFriends = await fetchFriends();
                setFriends(fetchedFriends.friends || fetchedFriends); 
            } catch (e) {
                console.error('Error in FriendsContext loadFriends:', e);
                setError(e.message || 'Failed to fetch friends. Please check your network connection.');
            } finally {
                setLoading(false);
            }
        };

        loadFriends();
    }, []);

    const contextValue = {
        friends,
        loading,
        error,
    };

    return (
        <FriendsContext.Provider value={contextValue}>
            {children}
        </FriendsContext.Provider>
    );
};

const useFriends = () => {
    const context = useContext(FriendsContext);
    if (!context) {
        throw new Error("useFriends must be used within a FriendsProvider");
    }
    return context;
};

export { FriendsProvider, useFriends };