import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const profileContextValue = {
        isEditMode,
        toggleEditMode,
    };

    return (
        <ProfileContext.Provider value={profileContextValue}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    return useContext(ProfileContext);
};