import React, { useState } from 'react';
import InputField from '../../../LoginScreen/components/FormSectionItem/InputField';
import CustomModal from '../../../../components/CustomModal';
import styles from '../../styles/FriendPageStyles';
import { View } from 'react-native';
const FriendAddModal = ({ visible, onDismiss, onAddFriend }) => {

    const [friendCode, setFriendCode] = useState('');

    const handleAdd = () => {
        onAddFriend(friendCode);
        setFriendCode('');
    };

    return (
        <CustomModal
            visible={visible}
            onDismiss={onDismiss}
            title="Add Friend"
            showConfirmButton={true}
            confirmText="Add"
            onConfirm={handleAdd}
        >
            <View style={{ paddingVertical: 35 }}>

            <InputField
                    label="Enter friend code"
                    value={friendCode}
                    onChangeText={setFriendCode}
                    style={styles.input}
                />
            </View>
               
        </CustomModal>
    );
};


export default FriendAddModal;