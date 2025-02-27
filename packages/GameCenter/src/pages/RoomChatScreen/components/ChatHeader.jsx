import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../../../components/BackIcon';
import GrandientText from '../../../components/GrandientText';
import { Text } from 'react-native-paper';

const ChatHeader = ({ roomName, roomTopic }) => {

    return (
        <View style={styles.header}>
            <BackButton top={0} left={0} />
            <View style={styles.centerContainer}>
                <GrandientText
                    text={roomName}
                    colors={['black', 'gray']}
                    textStyle={{ fontSize: 23 }}
                    gradientDirection="horizontal"
                    width={400} // Genişliği kontrol edin, gerekirse ekran genişliğine göre ayarlayın
                    height={30}
                    />
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.headerText}>{roomTopic}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row', // Öğeleri yatay olarak sırala
        justifyContent: 'space-between', // Öğeler arasında boşluk bırak
        alignItems: 'center', // Dikey olarak ortala
    },
    centerContainer: {
        flex: 1, // Ortadaki container'ın mümkün olan tüm alanı kaplamasını sağla
        alignItems: 'center', // İçindeki öğeyi (GrandientText) yatay olarak ortala
    },
    rightContainer: {
        alignItems: 'flex-end', // Sağ container içindeki öğeleri sağa hizala (isteğe bağlı)
    },
    headerText: {
        fontSize: 14, // Konu metni için daha küçük boyut
        fontFamily: 'Orbitron-ExtraBold',
        textAlign: 'right', // Metni sağa hizala (isteğe bağlı, sağ containera göre)
    },
});

export default ChatHeader;