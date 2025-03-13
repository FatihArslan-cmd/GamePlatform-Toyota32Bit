import React from 'react';
import CustomModal from '../../../../../../components/CustomModal';
import FastImage from 'react-native-fast-image';
import styles from '../../../../styles/FriendPageStyles';


const FriendDetailsModal = ({ visible, onDismiss, selectedFriend, onRemoveFriend }) => {
  return (
    <CustomModal
        visible={visible}
        onDismiss={onDismiss}
        title={selectedFriend ? selectedFriend.username : ''}
        showConfirmButton={true}
        confirmText="Remove Friend"
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