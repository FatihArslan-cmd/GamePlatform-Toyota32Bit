import React from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from '../../../../components/CustomModal';
import styles from '../../styles/FriendPageStyles'; 

const InviteModal = ({ visible, onDismiss, friendCode, onCopyCode, onShareCode, colors }) => {
  return (
    <CustomModal
        visible={visible}
        onDismiss={onDismiss}
        title="Invite Friends"
        showConfirmButton={true}
        confirmText="Share Code"
        onConfirm={onShareCode}
    >
        <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{friendCode}</Text>
            <TouchableRipple onPress={onCopyCode}>
                <Icon name="content-copy" size={24} color={colors.primary} />
            </TouchableRipple>
        </View>
    </CustomModal>
  );
};

export default InviteModal;