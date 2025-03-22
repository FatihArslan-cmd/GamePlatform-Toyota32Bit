import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import lobbyService from '../../HomeScreen/components/Header/services/lobbyService';
import { ToastService } from '../../../context/ToastService';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const LobbyUpdateContext = createContext();

const formatDate = (date) => {
    if (!date) return '';
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} ${hours}:${minutes}`;
};


const LobbyUpdateProvider = ({ children }) => {
    const [lobby, setLobby] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lobbyName, setLobbyName] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const navigation = useNavigation();
    const { t } = useTranslation(); 

    const [lobbyType, setLobbyType] = useState('Normal');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    useEffect(() => {
        const fetchLobby = async () => {
            setLoading(true);
            setError(null);
            try {
                const userLobbyData = await lobbyService.getUserLobby();
                if (userLobbyData) {
                    setLobby(userLobbyData);
                    setLobbyName(userLobbyData.lobbyName);
                    setMaxCapacity(String(userLobbyData.maxCapacity));
                    setLobbyType(userLobbyData.lobbyType || 'Normal');
                    setStartDate(userLobbyData.startDate ? new Date(userLobbyData.startDate) : new Date()); 
                    setEndDate(userLobbyData.endDate ? new Date(userLobbyData.endDate) : new Date()); 
                } else {
                    setError("No lobby found for the user.");
                }
            } catch (err) {
                console.error("Error fetching lobby:", err);
                setError("Failed to fetch lobby. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchLobby();
    }, []);

    const handleUpdateLobby = useCallback(async () => {
        if (!lobby) {
            ToastService.show("error", "No lobby found. Please try again.");
            return;
        }

        if (!lobbyName.trim()) {
            ToastService.show("error", t('updateLobbyScreen.lobbyNameEmptyError'));
            return;
        }

        if (!maxCapacity.trim()) {
            ToastService.show("error", t('updateLobbyScreen.maxCapacityEmptyError')); 
            return;
        }


        setLoading(true);
        setError(null);
        try {
            const updates = {
                lobbyCode: lobby.code,
                lobbyName: lobbyName,
                maxCapacity: maxCapacity,
                lobbyType: lobbyType,
                startDate: lobbyType === 'Event' && startDate ? startDate.toISOString() : null,
                endDate: lobbyType === 'Event' && endDate ? endDate.toISOString() : null,
            };
            await lobbyService.updateLobby(updates);
            ToastService.show("success", t('updateLobbyScreen.lobbyUpdatedSuccessfully')); 
            navigation.goBack();
        } catch (err) {
            setError("Failed to update lobby. Please check your input and try again.");
            ToastService.show("error", err);
        } finally {
            setLoading(false);
        }
    }, [lobby, navigation, lobbyName, maxCapacity, lobbyType, startDate, endDate, t]);


    const onStartDateChange = useCallback((event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(false);
        setStartDate(currentDate);
    }, [startDate, setShowStartDatePicker, setStartDate]);

    const onEndDateChange = useCallback((event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(false);
        setEndDate(currentDate);
    }, [endDate, setShowEndDatePicker, setEndDate]);


    const contextValue = {
        lobby,
        loading,
        error,
        lobbyName,
        setLobbyName,
        maxCapacity,
        setMaxCapacity,
        handleUpdateLobby,
        lobbyType,
        setLobbyType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        showStartDatePicker,
        setShowStartDatePicker,
        showEndDatePicker,
        setShowEndDatePicker,
        formatDate,
        onStartDateChange,
        onEndDateChange,
    };

    return (
        <LobbyUpdateContext.Provider value={contextValue}>
            {children}
        </LobbyUpdateContext.Provider>
    );
};

const useLobbyUpdate = () => {
    const context = useContext(LobbyUpdateContext);
    if (!context) {
        throw new Error("useLobbyUpdate must be used within a LobbyUpdateProvider");
    }
    return context;
};

export { LobbyUpdateProvider, useLobbyUpdate };