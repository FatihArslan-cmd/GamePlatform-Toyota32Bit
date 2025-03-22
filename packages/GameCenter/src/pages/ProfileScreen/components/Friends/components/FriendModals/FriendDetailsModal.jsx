import React from 'react';
import CustomModal from '../../../../../../components/CustomModal';
import FastImage from 'react-native-fast-image';
import styles from '../../../../styles/FriendPageStyles';
import { useTranslation } from 'react-i18next';

const FriendDetailsModal = ({ visible, onDismiss, selectedFriend, onRemoveFriend }) => {
    const { t } = useTranslation();
  return (
    <CustomModal
        visible={visible}
        onDismiss={onDismiss}
        title={selectedFriend ? selectedFriend.username : ''}
        showConfirmButton={true}
        confirmText={t('friendAddModal.removeFriend')}
        onConfirm={onRemoveFriend}
    >
        {selectedFriend && selectedFriend.profilePhoto ? (
            <FastImage
                source={{ uri: selectedFriend.profilePhoto, priority: FastImage.priority.normal }}
                style={styles.modalProfilePhoto}
                resizeMode={FastImage.resizeMode.cover}
            />
        ) : selectedFriend ?
            (<></>) : null
        }
    </CustomModal>
  );
};

export default FriendDetailsModal;