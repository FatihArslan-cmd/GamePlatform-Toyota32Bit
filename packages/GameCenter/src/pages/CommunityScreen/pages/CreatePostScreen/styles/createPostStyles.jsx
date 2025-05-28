import { StyleSheet } from "react-native";
import { isTablet } from "../../../../../utils/isTablet";

const TABLET_DEVICE = isTablet();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: TABLET_DEVICE ? 16 : 10,
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
    fontSize: TABLET_DEVICE ? 16 : 10,
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
    fontSize: TABLET_DEVICE ? 18 : 13,
          fontFamily: 'Orbitron-ExtraBold',
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
    fontSize: TABLET_DEVICE ? 14 : 11,
    fontFamily: 'Orbitron-ExtraBold',
  },
  postMediaContainer: {
    marginTop: 10,
    alignItems: 'center',
    position: 'relative', 
  },
  postMediaImage: {
    width: TABLET_DEVICE ? 200 : 125,
    height: TABLET_DEVICE ? 300 : 175,
    resizeMode: 'cover',
    borderRadius : 15
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