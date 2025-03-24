import React, { createContext, useState, useCallback } from 'react';
import { ToastService } from '../../../../../context/ToastService';
import { createLobby } from '../service/service';
import { useBingoWebSocket } from '../../../../../context/BingoGameWebsocket';

const CreateLobbyContext = createContext();

export const CreateLobbyProvider = ({ children }) => {
    
  const { connectWebSocket } = useBingoWebSocket();
  const [lobbyType, setLobbyType] = useState('Normal');
  const [lobbyName, setLobbyName] = useState('');
  const [gameName, setGameName] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  const validateFields = useCallback(() => {
    const newErrors = {};

    if (!lobbyName.trim()) newErrors.lobbyName = 'Lobby name required';
    if (!gameName.trim()) newErrors.gameName = 'Game name required';
    if (!maxCapacity) {
      newErrors.maxCapacity = 'Capacity required';
    } else if (isNaN(maxCapacity) || maxCapacity < 2) {
      newErrors.maxCapacity = 'Invalid capacity (min 2)';
    }

    if (hasPassword && !password.trim()) {
      newErrors.password = 'Password required';
    }

    if (lobbyType === 'Event') {
      if (!startDate) newErrors.startDate = 'Start date required';
      if (!endDate) newErrors.endDate = 'End date required';
      if (startDate >= endDate) newErrors.dateRange = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [lobbyName, gameName, maxCapacity, hasPassword, password, lobbyType, startDate, endDate]);

  // Lobby oluşturma fonksiyonu
  const handleCreateLobby = useCallback(async () => {
    if (!validateFields()) return;

    try {
      const requestBody = {
        lobbyName: lobbyName.trim(),
        gameName: gameName.trim(),
        lobbyType,
        maxCapacity: parseInt(maxCapacity, 10),
        hasPassword,
        password: hasPassword ? password.trim() : null,
        ...(lobbyType === 'Event' && {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        })
      };

      const response = await createLobby(requestBody);

      setCode(response.lobby.code);
      setIsCodeGenerated(true);
      connectWebSocket(response.lobby.code);
      ToastService.show('success', 'Lobby created successfully!');

    } catch (error) {
      ToastService.show('error', error.response?.data?.message || 'Failed to create lobby');
      setErrors(prev => ({ ...prev, server: error.message }));
    }
  }, [validateFields, lobbyName, gameName, maxCapacity, hasPassword, password, lobbyType, startDate, endDate, connectWebSocket]);

  // Form resetleme
  const resetLobby = useCallback(() => {
    setLobbyType('Normal');
    setLobbyName('');
    setGameName('');
    setMaxCapacity('');
    setPassword('');
    setCode('');
    setErrors({});
    setIsCodeGenerated(false);
    setHasPassword(false);
    setStartDate(new Date());
    setEndDate(new Date());
  }, []);

  // Context değeri
  const contextValue = {
    // State'ler
    lobbyType,
    lobbyName,
    gameName,
    maxCapacity,
    password,
    code,
    isPasswordVisible,
    isCodeGenerated,
    hasPassword,
    startDate,
    endDate,
    errors,

    // State updateler
    setLobbyType,
    setLobbyName,
    setGameName,
    setMaxCapacity,
    setPassword,
    setCode,
    setIsPasswordVisible,
    setHasPassword,
    setStartDate,
    setEndDate,

    // Fonksiyonlar
    toggleLobbyType: useCallback(() => {
      setLobbyType(prev => prev === 'Normal' ? 'Event' : 'Normal');
    }, []),

    togglePasswordVisibility: useCallback(() => {
      setIsPasswordVisible(prev => !prev);
    }, []),

    handleCreateLobby,
    resetLobby
  };

  return (
    <CreateLobbyContext.Provider value={contextValue}>
      {children}
    </CreateLobbyContext.Provider>
  );
};

export { CreateLobbyContext };