import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import GrandientText from '../../../components/GrandientText';
import styles from '../styles/ProfileScreenStyles';

const ProfileSection = () => {
    return (
        <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
                <FastImage
                    style={styles.profileImage}
                    source={{
                        uri: 'https://images1456.s3.eu-north-1.amazonaws.com/fox.jpg',
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
            <GrandientText
                text="FatihProfessional"
                colors={['#6200ee', '#FFFFFF']}
                textStyle={styles.userNameText}
                height={75}
                width={420}
            />
        </View>
    );
};

export default ProfileSection;