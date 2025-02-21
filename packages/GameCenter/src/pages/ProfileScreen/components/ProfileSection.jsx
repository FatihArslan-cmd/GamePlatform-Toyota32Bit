import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import GrandientText from '../../../components/GrandientText';
import styles from '../styles/ProfileScreenStyles';
import { UserContext } from '../../../context/UserContext';
import { IconButton,Tooltip } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const ProfileSection = ({ isEditMode }) => {
    const { user } = useContext(UserContext);
    const scale = useSharedValue(0); // Initial scale 0 for animation
    const rotation = useSharedValue(0); // Initial rotation 0 for animation

    useEffect(() => {
        if (isEditMode) {
            scale.value = withTiming(1, { // Animate scale to 1 (normal size)
                duration: 500, // Animation duration
                easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Example easing
            });
            rotation.value = withTiming(1, { // Animate rotation to 1 (360 deg)
                duration: 700,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
        } else {
            scale.value = withTiming(0, { // Animate scale back to 0
                duration: 500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
            rotation.value = withTiming(0, { // Animate rotation back to 0
                duration: 700,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
        }
    }, [isEditMode, scale, rotation]);

    const animatedCameraIconContainerStyle = useAnimatedStyle(() => {
        const interpolatedRotation = rotation.value * 360; // Rotate 360 degrees
        const animatedScale = scale.value; // Scale directly with animated value

        return {
            transform: [
                { scale: animatedScale },
                { rotate: `${interpolatedRotation}deg` },
            ],
            opacity: scale.value, // Control opacity with scale for fade effect during disappearance
        };
    });


    if (!user) {
        return null;
    }

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
                // Here you would typically update the user's profile photo in your context or backend
                // For now, we'll just log the URI.
                // setUser({...user, profilePhoto: selectedImage.uri}); // Example of updating context (if you have setUser available)
            }
        } catch (error) {
            console.error('Error launching image library', error);
        }
    };


    return (
        <View style={styles.profileSection}>
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
                    <Animated.View // Use Animated.View here
                        style={[styles.cameraIconContainer, animatedCameraIconContainerStyle]} // Apply animated style
                    >
                        <TouchableOpacity
                            onPress={handleProfileImageChange}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} // Ensure touchable area covers the icon
                        >
                            <IconButton
                                icon="camera"
                                size={24}
                                iconColor="#fff"
                                style={styles.cameraIcon}
                                containerColor="#6200ee"
                            />
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
            </Tooltip>
            <GrandientText
                text={user.username}
                colors={['#6200ee', '#FFFFFF']}
                textStyle={styles.userNameText}
                height={75}
                width={420}
            />
        </View>
    );
};

export default ProfileSection;