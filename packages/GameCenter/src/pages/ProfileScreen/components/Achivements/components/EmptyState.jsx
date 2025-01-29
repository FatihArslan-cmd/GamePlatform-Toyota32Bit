import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Surface, IconButton, useTheme } from 'react-native-paper';

const EmptyState = () => {
    const theme = useTheme();
  return (
    <Surface style={styles.emptyContainer} elevation={0}>
      <IconButton
        icon="trophy"
        size={64}
        iconColor={theme.colors.primary}
        style={{ opacity: 0.5 }}
      />
      <Text variant="headlineSmall" style={styles.emptyTitle}>No Achievements Yet</Text>
      <Text variant="bodyMedium" style={styles.emptyDescription}>
        Keep playing to earn achievements and unlock rewards!
      </Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    backgroundColor: 'transparent',
  },
  emptyTitle: {
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
    fontWeight:'200',
    fontFamily: 'SQR721B'
  },
  emptyDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    paddingHorizontal: 32,
      fontFamily: 'SQR721B'
  },
});

export default EmptyState;