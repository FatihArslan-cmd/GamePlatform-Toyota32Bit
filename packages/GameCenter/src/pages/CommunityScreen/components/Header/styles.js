import { StyleSheet } from "react-native";
import { isTablet } from "../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();


const createStyles = (colors) => StyleSheet.create({ 
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  leftContainer: {
    left: 15,
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  profileImageContainer: {
    width: TABLET_DEVICE ? 50 : 35,
    height: TABLET_DEVICE ? 50 : 35,
    borderRadius: 25,
    overflow: 'hidden',
    borderColor: colors.border,
    borderWidth: 1,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default createStyles;