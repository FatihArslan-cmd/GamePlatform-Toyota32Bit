import React from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';
import CustomModal from '../../../../../../components/CustomModal';
import styles from '../../../../styles/FriendPageStyles';
import { useTranslation } from 'react-i18next'; 

const InviteModal = ({ visible, onDismiss, friendCode, onCopyCode, onShareCode, colors }) => {
  const { t } = useTranslation();

  return (
    <CustomModal
        visible={visible}
        onDismiss={onDismiss}
        title={t('friendAddModal.inviteFriends')} 
        showConfirmButton={true}
        confirmText={t('friendAddModal.shareCode')} 
        onConfirm={onShareCode}
    >
        <View style={styles.codeContainer}>
          <QRCode
            value={friendCode}
            size={150}
            color="white"
            backgroundColor={'#121212'}
          />
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
            <Text style={[styles.codeText,{color:colors.text}]}>{friendCode}</Text>
            <TouchableRipple onPress={onCopyCode}>
                <Icon name="content-copy" size={24} color={colors.primary} />
            </TouchableRipple>
            </View>
        </View>
    </CustomModal>
  );
};

export default InviteModal;