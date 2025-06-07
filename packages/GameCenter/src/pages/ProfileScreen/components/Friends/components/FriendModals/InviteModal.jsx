import CustomModal from "../../../../../../components/CustomModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import QRCode from "react-native-qrcode-svg";
import React from "react";
import styles from "../../../../styles/FriendPageStyles";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

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
            color="black"
            backgroundColor={'white'} 
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