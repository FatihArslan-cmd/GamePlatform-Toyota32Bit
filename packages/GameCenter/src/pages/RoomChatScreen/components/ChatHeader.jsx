import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../../../components/BackIcon';
import GrandientText from '../../../components/GrandientText';

const ChatHeader = ({ roomName }) => {

    return (
        <View style={styles.header}>
     <BackButton top={0} left={0} />
    <GrandientText
      text={ roomName }
      colors={['black', 'gray']} // Gold to Bronze
      textStyle={{ fontSize: 23}}
      gradientDirection="horizontal"
      width={400}
      height={30}
      />  
    </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 22,
        fontFamily: 'Orbitron-ExtraBold',
    },
});

export default ChatHeader;