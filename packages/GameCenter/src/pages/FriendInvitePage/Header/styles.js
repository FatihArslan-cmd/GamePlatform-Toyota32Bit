import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: 'rgba(245, 245, 245, 0.6)', 
    elevation: 5,
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
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;