import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        paddingHorizontal: 15,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    topBarIcon: {
        margin: 0
    },
    title: {
        fontSize: 28,        color: '#e5e6ea',
        alignSelf: "center",
        paddingLeft: 10,
        fontFamily: 'Orbitron-VariableFont_wght',
    },
    profileSection: {
        alignItems: 'center',
        paddingTop: 20,
    },
    profileImageContainer: {
        position: 'relative',
        marginVertical: 20,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    userNameText: {
        fontSize: 42,
        fontFamily: 'Orbitron-VariableFont_wght',
        marginTop: 20,
    },
});

export default styles;