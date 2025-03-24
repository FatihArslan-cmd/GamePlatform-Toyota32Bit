import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
     container: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    modalProfilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
         alignSelf: 'center',
          marginVertical: 25,
      },
    profilePhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    input: {
        backgroundColor: '#ffffff10',
        flex: 1,
    },
    inviteButton: {
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inviteButtonText: {
        fontSize: 16,
    },
    friendsList: {
        flex: 1,
    },
    friendCard: {
        backgroundColor: '#ffffff10',
        padding: 15,
        marginVertical: 5,
    },
    friendName: {
        fontSize: 18,
        fontFamily: 'Orbitron-ExtraBold',
    },
    friendCardContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    emptyListText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
        fontSize: 16,
    },
     codeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        padding: 10,
    },
    codeText: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Orbitron-ExtraBold',
        marginRight: 10
    },
    snackbar: {
       zIndex: 10004,
    },
});

export default styles;