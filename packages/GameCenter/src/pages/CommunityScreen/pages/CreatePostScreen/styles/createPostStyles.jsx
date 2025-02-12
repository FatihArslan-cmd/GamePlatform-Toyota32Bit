import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  postButton: {
    borderRadius: 20,
    backgroundColor: '#1DA1F2',
  },
  postButtonLabel: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 8,
  },
  postArea: {
    padding: 16,
    flex: 1,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    marginRight: 12,
  },
  inputArea: { // Added inputArea style to potentially adjust card content if needed
    padding: 0, // Reset default padding of Card.Content if needed
    margin: 0,
  },
  input: {
    fontSize: 18,
    color: '#000',
    minHeight: 100,
    backgroundColor: 'white',
    padding: 0, // Reset default padding of TextInput if needed
    margin: 0,
  },
  toolbarContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dropdownButton: {
    backgroundColor: '#E8F0FE', // Light blue background like in the image
    borderRadius: 20, // Rounded corners
    paddingHorizontal: 12, // Horizontal padding to match the image
    paddingVertical: 8, // Vertical padding
    flexDirection: 'row', // To align text and icon horizontally
    alignItems: 'center', // To vertically align text and icon
  },
  dropdownText: {
    color: '#1DA1F2', // Blue text color like in the image
    fontSize: 14, // Match the font size, you might need to adjust this
  },
});

export default styles;