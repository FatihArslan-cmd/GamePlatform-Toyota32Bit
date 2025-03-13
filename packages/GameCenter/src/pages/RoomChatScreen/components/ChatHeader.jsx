import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../../../components/BackIcon';
import GrandientText from '../../../components/GrandientText';
import { Text } from 'react-native-paper';
import { useTheme } from '../../../context/ThemeContext';

const ChatHeader = ({ roomName, roomTopic }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <BackButton top={0} left={0} />
            <View style={styles.centerContainer}>
                <GrandientText
                    text={roomName}
                    colors={colors.languageTextGradient}
                    textStyle={[styles.usernameText, { fontSize: 23, color: colors.text }]}
                    gradientDirection="horizontal"
                    width={400}
                    height={30}
                    />
            </View>
            <View style={styles.rightContainer}>
                <Text style={[styles.headerText, { color: colors.subText }]}>{roomTopic}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    headerText: {
        fontSize: 14,
        fontFamily: 'Orbitron-ExtraBold',
        textAlign: 'right',
    },
    usernameText: {
        fontFamily: 'Orbitron-ExtraBold',
    },
});

export default ChatHeader;