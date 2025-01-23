import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import BottomSheet from '../../../../components/BottomSheet';
import LobbyTypeSelector from './LobbyTypeSelector';
import CustomDateTimeSelector from './DateTimeSelector';
import GameSelector from './GameSelector';
import PasswordInput from './PasswordInput';
import InvitationLink from './InvitationLink';
import ToastMessage from '../../../../components/ToastMessage/Toast';
import useToast from '../../../../components/ToastMessage/hooks/useToast';
import { getToken } from '../../../../shared/states/api';
import CustomModal from '../../../../components/CustomModal';

const CreateLobbyModal = ({ visible, onDismiss }) => {
const [lobbyType, setLobbyType] = useState('normal');
const [lobbyName, setLobbyName] = useState('');
const [gameName, setGameName] = useState('');
const [maxCapacity, setMaxCapacity] = useState('');
const [password, setPassword] = useState('');
const [code, setCode] = useState('');
const [error, setError] = useState('');
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
const [modalText, setModalText] = useState('');

const { currentToast, showToast, hideToast } = useToast();

const toggleLobbyType = useCallback(() => {
 setLobbyType((current) => (current === 'normal' ? 'event' : 'normal'));
}, []);

 const handleModalDismiss = useCallback(() => {
     setModalVisible(false);
 }, []);


const handleSave = useCallback(async () => {
 if (!lobbyName.trim()) {
     setModalText('Lobby name cannot be empty');
     setModalVisible(true)
   return;
 }
 if (!gameName.trim()) {
     setModalText('Game name cannot be empty');
     setModalVisible(true)
   return;
 }
 if (!maxCapacity.trim()) {
     setModalText('Max capacity cannot be empty');
     setModalVisible(true)
   return;
 }

 const token = getToken();
 if (!token) {
     setModalText('Authentication token not found');
     setModalVisible(true)
   return;
 }

 const requestBody = {
   lobbyName,
   lobbyType,
   gameName,
   code,
   maxCapacity: parseInt(maxCapacity, 10),
   password: password || null,
 };

 try {
   const response = await fetch('http://10.0.2.2:3000/api/lobby/create', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`,
     },
     body: JSON.stringify(requestBody),
   });

   const data = await response.json();
   if (!response.ok) {
     throw new Error(data.message || 'Failed to create lobby');
   }
   console.log(data);
   setCode(`${data.lobby.code}`);
   showToast('success', 'Lobby created successfully!');
 } catch (error) {
     setModalText(error.message);
     setModalVisible(true);
 }
}, [lobbyName, lobbyType, gameName, password, maxCapacity]);

const resetLobby = useCallback(() => {
 setLobbyType('normal');
 setPassword('');
 setMaxCapacity('');
 setCode('');
 setError('');
 setGameName('');
 setLobbyName('');
}, [gameName]);

const bottomSheetHeight = lobbyType === 'normal' ? '50%' : '70%';

return (
 <BottomSheet
   visible={visible}
   onDismiss={onDismiss}
   title="Create Lobby"
   height={bottomSheetHeight}
   backgroundColor="white"
 >
   <View style={styles.container}>
     {!code ? (
       <>
         <LobbyTypeSelector lobbyType={lobbyType} onToggle={toggleLobbyType} />
         {lobbyType === 'event' && <CustomDateTimeSelector />}
         <GameSelector
           gameName={gameName}
           lobbyName={lobbyName}
           maxCapacity={maxCapacity}
           onGameNameChange={setGameName}  // Changed
           onLobbyNameChange={setLobbyName} // Changed
           onMaxCapacityChange={setMaxCapacity} // Changed
         />
         <PasswordInput
           password={password}
           isPasswordVisible={isPasswordVisible}
           onPasswordChange={setPassword}
           onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
         />
         <Button
           mode="contained"
           onPress={handleSave}
           style={[
             styles.createButton,
             code && styles.createButtonWithLink,
           ]}
           contentStyle={styles.createButtonContent}
           icon="plus-circle"
         >
           Create Lobby
         </Button>
       </>
     ) : (
       <View style={styles.successContainer}>
         <InvitationLink code={code} />
         <Button
           mode="outlined"
           onPress={resetLobby}
           style={styles.resetButton}
           icon="refresh"
         >
           Create New Lobby
         </Button>
       </View>
     )}
   </View>
   {currentToast && (
     <ToastMessage
       type={currentToast.type}
       message={currentToast.message}
       onHide={hideToast}
     />
   )}
     <CustomModal
         visible={modalVisible}
         onDismiss={handleModalDismiss}
         text={modalText}
         title="Error"
     />
 </BottomSheet>
);
};

const styles = StyleSheet.create({
container: {
 flex: 1,
 padding: 16,
},
successContainer: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 paddingVertical: 20,
},
createButton: {
 marginTop: 'auto',
 paddingVertical: 8,
},
createButtonWithLink: {
 marginTop: 16,
},
createButtonContent: {
 height: 48,
},
resetButton: {
 marginTop: 'auto',
},
});

export default CreateLobbyModal;