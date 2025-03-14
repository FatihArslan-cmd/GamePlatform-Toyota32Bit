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
  inputArea: { 
    padding: 0, 
    marginTop: 30,
  },
  input: {
    fontSize: 18,
    color: '#000',
    minHeight: 100,
    backgroundColor: 'white',
    padding: 0, 
    margin: 0,
    borderRadius:5
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
    backgroundColor: '#E8F0FE', 
    borderRadius: 20, 
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 14, 
  },
  postMediaContainer: {
    marginTop: 10,
    alignItems: 'center',
    position: 'relative', 
  },
  postMediaImage: {
    width: 200,
    height: 300, 
    resizeMode: 'cover',
  },
  removeMediaButton: {
    position: 'absolute',
    top: -10, 
    right: -10, 
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeMediaIcon: {
    color: '#fff',
  },
});

export default styles;