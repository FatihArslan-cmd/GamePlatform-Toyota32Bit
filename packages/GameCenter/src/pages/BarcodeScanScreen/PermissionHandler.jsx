import React from "react";
import { StyleSheet, View } from "react-native";

//This must be blank for the camera to work properly

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
 
});

export default PermissionHandler;