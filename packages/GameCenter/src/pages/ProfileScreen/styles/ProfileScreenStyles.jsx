import { StyleSheet } from "react-native";
import { isTablet } from "../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    topBarIcon: {
        margin: 0
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
        width: TABLET_DEVICE ? 200 : 125,
        height: TABLET_DEVICE ? 200 : 125,
        borderRadius: 100,
    },
    userNameText: {
        fontSize: TABLET_DEVICE ? 42 : 24,
        fontFamily: 'Orbitron-ExtraBold',
        marginTop: TABLET_DEVICE ? 20 : 5,
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 25,
        overflow: 'hidden',
    },
    cameraIcon: {
        margin: 0,
        borderRadius: 25,
    },
});

export default styles;