import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import lobbyService from '../../HomeScreen/components/Header/services/lobbyService';
import { ToastService } from '../../../context/ToastService';
import { useNavigation } from '@react-navigation/native';

const LobbyUpdateContext = createContext();

const formatDate = (date) => {
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};


const LobbyUpdateProvider = ({ children }) => {
    const [lobby, setLobby] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lobbyName, setLobbyName] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const navigation = useNavigation();

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
                    setLobbyType(userLobbyData.lobbyType || 'Normal'); // Lobby tipini de context state'ine set et
                    setStartDate(userLobbyData.startDate ? new Date(userLobbyData.startDate) : new Date()); // Başlangıç tarihini set et
                    setEndDate(userLobbyData.endDate ? new Date(userLobbyData.endDate) : new Date()); // Bitiş tarihini set et
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

    const handleUpdateLobby = useCallback(async (updatesFromPage) => {
        if (!lobby) {
            ToastService.show("error", "No lobby found. Please try again.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const updates = {
                lobbyCode: lobby.code,
                lobbyName: updatesFromPage.lobbyName,
                maxCapacity: updatesFromPage.maxCapacity,
                lobbyType: updatesFromPage.lobbyType,
                startDate: updatesFromPage.startDate,
                endDate: updatesFromPage.endDate,
            };
            await lobbyService.updateLobby(updates);
            ToastService.show("success", "Lobby updated successfully.");
            navigation.goBack();
        } catch (err) {
            console.error("Error updating lobby:", err);
            setError("Failed to update lobby. Please check your input and try again.");
            ToastService.show("error", "Failed to update lobby. Please check your input and try again.");
        } finally {
            setLoading(false);
        }
    }, [lobby, navigation]);


    const onStartDateChange = useCallback((event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(false);
        setStartDate(currentDate);
    }, [startDate]);

    const onEndDateChange = useCallback((event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(false);
        setEndDate(currentDate);
    }, [endDate]);


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
        formatDate, // formatDate fonksiyonunu context'e ekle
        onStartDateChange, // onStartDateChange fonksiyonunu context'e ekle
        onEndDateChange,   // onEndDateChange fonksiyonunu context'e ekle
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