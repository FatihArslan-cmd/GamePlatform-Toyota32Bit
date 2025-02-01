import React from "react";
import {View, StyleSheet} from "react-native";

const PermissionHandler = () => {
  return (
      <View style={styles.permissionContainer}>
       
      </View>
  );
};

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PermissionHandler;