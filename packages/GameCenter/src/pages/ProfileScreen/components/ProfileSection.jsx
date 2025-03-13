import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import GrandientText from '../../../components/GrandientText';
import styles from '../styles/ProfileScreenStyles';
import { UserContext } from '../../../context/UserContext';
import { IconButton, Tooltip } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import Animated from 'react-native-reanimated';
import { useProfile } from '../context/ProfileContext';
import useProfileSectionAnimation from './hooks/useProfileSectionAnimation';
import { useTheme } from '../../../context/ThemeContext'; 

const ProfileSection = () => {
    const { user } = useContext(UserContext);
    const { isEditMode } = useProfile();
    const { animatedCameraIconContainerStyle } = useProfileSectionAnimation(isEditMode);
    const { colors } = useTheme();

    const handleProfileImageChange = async () => {
        if (!isEditMode) return;

        const options = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 500,
            maxHeight: 500,
            includeBase64: false,
        };

        try {
            const result = await launchImageLibrary(options);
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.log('ImagePicker Error: ', result.error);
            } else if (result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0];
                console.log('Selected image URI:', selectedImage.uri);
            }
        } catch (error) {
            console.error('Error launching image library', error);
        }
    };


    return (
        <View style={[styles.profileSection, { backgroundColor: colors.background }]}> 
            <Tooltip title='Profile' >
            <View style={styles.profileImageContainer}>
                <FastImage
                    style={styles.profileImage}
                    source={{
                        uri: user.profilePhoto,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                {isEditMode && (
                    <Animated.View
                        style={[styles.cameraIconContainer, animatedCameraIconContainerStyle, { backgroundColor: colors.background }]} // Apply background color from theme
                    >
                        <TouchableOpacity
                            onPress={handleProfileImageChange}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <IconButton
                                icon="camera"
                                size={24}
                                iconColor={colors.card} 
                                style={styles.cameraIcon}
                                containerColor={colors.primary} 
                            />
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
            </Tooltip>
            <GrandientText
                text={user.username}
                colors={colors.usernameGradient}
                textStyle={[styles.userNameText, { color: colors.text }]} 
                height={75}
                width={420}
            />
        </View>
    );
};

export default ProfileSection;