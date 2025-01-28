import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import InputField from '../../LoginScreen/components/FormSectionItem/InputField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from '../../../components/CustomModal';


const FriendsPage = () => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const handleInvitePress = () => {
        setModalVisible(true);
    };

    const handleModalDismiss = () => {
        setModalVisible(false);
    };


    return (
        <View style={styles.container}>
             <CustomModal
                visible={modalVisible}
                onDismiss={handleModalDismiss}
                title="Invite Friends"
                text="Share this code with your friends to join your network!"
                showConfirmButton={true}
                confirmText="Share"
                onConfirm={() => {
                    handleModalDismiss()
                    console.log("Copy link was pressed")
                }}
            >
              
            </CustomModal>
            <View style={styles.searchContainer}>
                <InputField
                    label="Search friends"
                    leftIcon="magnify"
                    style={styles.input}
                />
            </View>
            <Button
                mode="contained"
                style={[styles.inviteButton, { backgroundColor: `${colors.primary}70`}]}
                buttonColor={colors.primary}
                labelStyle={[styles.inviteButtonText, { color: 'white', opacity: 0.80 }]}
                icon={() => <Icon name="link-variant" color='white' size={24}/>}
                iconPosition="trailing"
                onPress={handleInvitePress}
            >
                Get a link to invite users
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
        backgroundColor: '#ffffff10',
        flex: 1,
    },
    inviteButton: {
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inviteButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default FriendsPage;