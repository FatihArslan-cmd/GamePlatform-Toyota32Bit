import React from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import CustomModal from '../../../../../components/CustomModal';
import styles from '../../../styles/FriendPageStyles';

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
          <QRCode
            value={friendCode}
            size={150} // Adjust size as needed
            color="white"
            backgroundColor={'#121212'} // or any suitable background
          />
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
            <Text style={styles.codeText}>{friendCode}</Text>
            <TouchableRipple onPress={onCopyCode}>
                <Icon name="content-copy" size={24} color={colors.primary} />
            </TouchableRipple>
            </View>
        </View>
    </CustomModal>
  );
};

export default InviteModal;