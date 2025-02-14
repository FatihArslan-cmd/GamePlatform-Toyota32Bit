import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import BottomSheet from '../../../../components/BottomSheet';
import LobbyTypeSelector from './LobbyTypeSelector';
import CustomDateTimeSelector from './DateTimeSelector';
import GameSelector from './GameSelector';
import PasswordInput from './PasswordInput';
import InvitationLink from './InvitationLink';
import { ToastService } from '../../../../context/ToastService';
import { createLobby } from './service/service';

const CreateLobbyModal = ({ visible, onDismiss }) => {
const [lobbyType, setLobbyType] = useState('Normal');
const [lobbyName, setLobbyName] = useState('');
const [gameName, setGameName] = useState('');
const [maxCapacity, setMaxCapacity] = useState('');
const [password, setPassword] = useState('');
const [code, setCode] = useState('');
const [error, setError] = useState('');
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const [isCodeGenerated, setIsCodeGenerated] = useState(false);


const toggleLobbyType = useCallback(() => {
 setLobbyType((current) => (current === 'Normal' ? 'Event' : 'Normal'));
}, []);


const handleSave = useCallback(async () => {
 if (!lobbyName.trim()) {
     ToastService.show("error", 'Lobby name cannot be empty');
   return;
 }
 if (!gameName.trim()) {
     ToastService.show("error", 'Game name cannot be empty');
   return;
 }
 if (!maxCapacity.trim()) {
     ToastService.show("error", 'Max capacity cannot be empty');
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
   const data = await createLobby(requestBody); // Use the service function
   console.log(data);
   setCode(`${data.lobby.code}`);
   setIsCodeGenerated(true);
   ToastService.show("success", "Lobby created successfully!");
 } catch (error) {
     ToastService.show("error", error.message);
 }
}, [lobbyName, lobbyType, gameName, password, maxCapacity]);

const resetLobby = useCallback(() => {
 setLobbyType('Normal');
 setPassword('');
 setMaxCapacity('');
 setCode('');
 setError('');
 setGameName('');
 setLobbyName('');
 setIsCodeGenerated(false);
}, [gameName]);

const handleDismiss = useCallback(() => {
  resetLobby();
  onDismiss();
}, [onDismiss, resetLobby]);


const bottomSheetHeight = lobbyType === 'Normal' ? '50%' : '70%';

return (
 <BottomSheet
   visible={visible}
   onDismiss={handleDismiss}
   title="Create Lobby"
   height={bottomSheetHeight}
   backgroundColor="white"
 >
   <View style={styles.container}>
     {!isCodeGenerated ? (
       <>
         <LobbyTypeSelector lobbyType={lobbyType} onToggle={toggleLobbyType} />
         {lobbyType === 'Event' && <CustomDateTimeSelector />}
         <GameSelector
           gameName={gameName}
           lobbyName={lobbyName}
           maxCapacity={maxCapacity}
           onGameNameChange={setGameName}
           onLobbyNameChange={setLobbyName}
           onMaxCapacityChange={setMaxCapacity}
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
             isCodeGenerated && styles.createButtonWithLink,
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