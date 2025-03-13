import { StyleSheet } from 'react-native';

export const pageStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const invitationCardStyles = StyleSheet.create({
  surfaceCard: {
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: 75,
  },
  inviterAvatar: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginVertical: 10,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteMessage: {
    fontSize: 16,
    fontFamily: 'Orbitron-ExtraBold',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center'
  },
  timestamp: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Orbitron-VariableFont_wght',
    opacity: 0.7
  },
  actions: {
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 8,
  },
  acceptButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 12,
  },
  rejectButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  buttonLabel: {
    fontFamily: 'Orbitron-ExtraBold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});