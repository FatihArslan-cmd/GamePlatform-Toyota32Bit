import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: 'rgba(245, 245, 245, 0.6)', // Optional: Semi-transparent background for content
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between', // Distributes space evenly
  },
  leftContainer: {
    left: 15,
    flex: 1, // Takes up 1/3 of the available space
    alignItems: 'flex-start', // Align content to the start (left)
  },
  centerContainer: {
    flex: 1, // Takes up 1/3 of the available space
    alignItems: 'center', // Centers the text horizontally
  },
  rightContainer: {
    flex: 1, // Takes up 1/3 of the available space
    alignItems: 'flex-end', // Align content to the end (right)
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;