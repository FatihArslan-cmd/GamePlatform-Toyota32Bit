import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: 'white',
    elevation: 2, // Add elevation here for the shadow
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between', // Distributes space evenly
    borderBottomWidth: 1.5, // Optional: Add a hairline border for a subtle line
    borderBottomColor: '#ddd', // Optional: Border color
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
  profileImageContainer: {
    width: 50, // Adjust as needed
    height: 50, // Adjust as needed
    borderRadius: 25, // Half of width/height for a circle
    overflow: 'hidden', // Clip image if it overflows the rounded border
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