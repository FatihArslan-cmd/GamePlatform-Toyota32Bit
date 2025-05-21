import { StyleSheet } from "react-native";

export const pageStyles = (colors) => StyleSheet.create({
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
    backgroundColor: colors.blurredImageBackground,
},
});

export const invitationCardStyles = (colors) => StyleSheet.create({
  surfaceCard: {
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
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
    backgroundColor: colors.card,
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
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center'
  },
  timestamp: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Orbitron-VariableFont_wght',
    opacity: 0.7,
    color: colors.subText,
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
    color: colors.text,
  },
});