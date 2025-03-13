import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appbar: {
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomColor: '#ddd',
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
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
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

export default styles;