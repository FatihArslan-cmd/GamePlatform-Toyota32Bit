import React from 'react';
import { View, StyleSheet } from 'react-native';
import InputField from '../../../../../LoginScreen/components/FormSectionItem/InputField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const JoinLobbyModalContent = ({ hasPassword, password, setPassword }) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {hasPassword && (
        <View style={styles.inputContainer}>
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible} // Toggle secureTextEntry based on visibility
            textColor="#ffffff"
            style={styles.passwordInput}
            rightIcon={() => (
              <Icon
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="#8a2be2" // or any color you prefer
                onPress={togglePasswordVisibility}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  passwordInput: {
    backgroundColor: '#444444',
    borderRadius: 8,
    marginTop: 10,
  },
  inputContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
});

export default JoinLobbyModalContent;